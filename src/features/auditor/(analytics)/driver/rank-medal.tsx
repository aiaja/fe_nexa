interface RankMedalProps {
  rank: number;
}

export function RankMedal({ rank }: RankMedalProps) {
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  const medal = getMedalIcon(rank);

  return (
    <div className="flex items-center gap-2">
      {medal && <span className="text-2xl">{medal}</span>}
      <span className="font-semibold text-gray-900">#{rank}</span>
    </div>
  );
}
