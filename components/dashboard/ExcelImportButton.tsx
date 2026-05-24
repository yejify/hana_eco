'use client';

import * as XLSX from 'xlsx';

import { ActivityData, ActivityType } from '@/types/activity';
import { calculateEmission } from '@/utils/calculateEmission';

type ExcelImportButtonProps = {
  importActivities: (activities: ActivityData[]) => void;
};

const ACTIVITY_TYPE_MAP: Record<string, ActivityType> = {
  전기: 'electricity',
  원소재: 'material',
  운송: 'transport',
};

export default function ExcelImportButton({
  importActivities,
}: ExcelImportButtonProps) {
  const handleImportExcel = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, {
      type: 'array',
    });

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

    const invalidRows: string[] = [];

    const activities: ActivityData[] = rows
      .map((row, index) => {
        const productName = String(row['설명'] ?? '');

        const rawActivityType = String(row['활동 유형'] ?? '');

        const amount = Number(row['량'] ?? 0);

        const unit = String(row['단위'] ?? '');

        const activityType = ACTIVITY_TYPE_MAP[rawActivityType];

        if (!activityType) {
          console.warn('지원하지 않는 활동 유형:', rawActivityType);

          invalidRows.push(`${index + 1}행 - ${rawActivityType}`);

          return null;
        }

        return {
          id: Date.now() + index,
          productName,
          activityType,
          amount,
          unit,
          emission: calculateEmission(activityType, amount),
        };
      })
      .filter((activity): activity is ActivityData => activity !== null);

    if (invalidRows.length > 0) {
      alert(
        `지원하지 않는 활동 유형이 존재합니다.\n\n${invalidRows.join('\n')}`,
      );
    }

    importActivities(activities);

    event.target.value = '';
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
