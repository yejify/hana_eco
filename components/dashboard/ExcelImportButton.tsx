'use client';

import * as XLSX from 'xlsx';

import { ActivityType, CreateActivityRequest } from '@/types/activity';

type ExcelImportButtonProps = {
  importActivities: (activities: CreateActivityRequest[]) => Promise<void>;
};

/**
 * 엑셀 활동 유형 → 내부 ActivityType 매핑
 */
const ACTIVITY_TYPE_MAP: Record<string, ActivityType> = {
  전기: 'electricity',
  원소재: 'material',
  운송: 'transport',
  폐기물: 'waste',
};

export default function ExcelImportButton({
  importActivities,
}: ExcelImportButtonProps) {
  /**
   * 엑셀 업로드 처리
   */
  const handleImportExcel = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      /**
       * 엑셀 파일을 ArrayBuffer로 변환
       */
      const arrayBuffer = await file.arrayBuffer();

      /**
       * Workbook 생성
       */
      const workbook = XLSX.read(arrayBuffer, {
        type: 'array',
      });

      /**
       * 모든 시트를 순회하면서
       * "일자(원본)" 헤더를 가진 시트 탐색
       */
      let targetWorksheet: XLSX.WorkSheet | null = null;

      /**
       * 헤더 위치 저장용
       */
      let headerRowIndex = -1;
      let headerColumnIndex = -1;

      /**
       * 시트 순회
       */
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];

        /**
         * 시트를 2차원 배열 형태로 변환
         */
        const sheetData = XLSX.utils.sheet_to_json<(string | number)[]>(
          worksheet,
          {
            header: 1,
            raw: false,
          },
        );

        /**
         * "일자(원본)" 위치 탐색
         */
        for (let rowIndex = 0; rowIndex < sheetData.length; rowIndex++) {
          const row = sheetData[rowIndex];

          if (!Array.isArray(row)) continue;

          const columnIndex = row.findIndex(
            (cell) => String(cell).trim() === '일자(원본)',
          );

          /**
           * 헤더 발견
           */
          if (columnIndex !== -1) {
            targetWorksheet = worksheet;

            headerRowIndex = rowIndex;

            headerColumnIndex = columnIndex;

            break;
          }
        }

        /**
         * 이미 찾았으면 종료
         */
        if (targetWorksheet) break;
      }

      /**
       * 헤더를 찾지 못한 경우
       */
      if (
        !targetWorksheet ||
        headerRowIndex === -1 ||
        headerColumnIndex === -1
      ) {
        alert('일자(원본) 헤더를 찾을 수 없습니다.');

        return;
      }

      /**
       * 선택된 시트 데이터를 배열 형태로 변환
       */
      const sheetData = XLSX.utils.sheet_to_json<(string | number)[]>(
        targetWorksheet,
        {
          header: 1,
          raw: false,
          dateNF: 'yyyy-mm-dd',
        },
      );

      /**
       * 필요한 컬럼만 추출
       */
      const extractedRows = sheetData
        .slice(headerRowIndex + 1)
        .map((row) => ({
          activityDate: row[headerColumnIndex],

          activityType: row[headerColumnIndex + 1],

          description: row[headerColumnIndex + 2],

          amount: row[headerColumnIndex + 3],

          unit: row[headerColumnIndex + 4],
        }))
        /**
         * 설명이 없는 행 제거
         */
        .filter((row) => row.description);

      /**
       * 지원하지 않는 활동 유형 목록
       */
      const invalidRows: string[] = [];

      /**
       * CreateActivityRequest 형태로 변환
       */
      const activities: CreateActivityRequest[] = extractedRows
        .map((row, index) => {
          /**
           * 활동 일자
           */
          const activityDate = String(row.activityDate ?? '').split(' ')[0];

          /**
           * 설명
           */
          const productName = String(row.description ?? '');

          /**
           * 활동 유형 원본
           */
          const rawActivityType = String(row.activityType ?? '');

          /**
           * 사용량
           */
          const amount = Number(row.amount ?? 0);

          /**
           * 단위
           */
          const unit = String(row.unit ?? '');

          /**
           * 내부 ActivityType 변환
           */
          const activityType = ACTIVITY_TYPE_MAP[rawActivityType];

          /**
           * 지원하지 않는 활동 유형 처리
           */
          if (!activityType) {
            console.warn('지원하지 않는 활동 유형:', rawActivityType);

            invalidRows.push(`${index + 1}행 - ${rawActivityType}`);

            return null;
          }

          return {
            activityDate,
            productName,
            activityType,
            amount,
            unit,
          };
        })
        /**
         * null 제거
         */
        .filter(
          (activity): activity is CreateActivityRequest => activity !== null,
        );

      /**
       * 데이터가 없는 경우
       */
      if (activities.length === 0) {
        alert('가져올 수 있는 데이터가 없습니다.');

        return;
      }

      /**
       * 지원하지 않는 활동 유형 안내
       */
      if (invalidRows.length > 0) {
        alert(
          `지원하지 않는 활동 유형이 존재합니다.\n\n${invalidRows.join('\n')}`,
        );
      }

      /**
       * 서버 저장 요청
       */
      await importActivities(activities);

      alert(`${activities.length}개의 데이터를 가져왔습니다.`);
    } catch (error) {
      console.error(error);

      alert('엑셀 파일을 불러오는 중 오류가 발생했습니다.');
    } finally {
      /**
       * 동일 파일 재선택 가능하도록 초기화
       */
      event.target.value = '';
    }
  };

  return (
    <label className='cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100'>
      Excel Import
      <input
        type='file'
        accept='.xlsx,.xls'
        onChange={handleImportExcel}
        className='hidden'
      />
    </label>
  );
}
