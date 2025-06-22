import { Badge } from "../components/ui/badge";
interface TrackInfoProps {
  title: string;
  description?: string;
  duration?: number;
  mood: string;
  genre: string;
  moods: Array<{ id: string; name: string; emoji: string }>;
  genres: Array<{ id: string; name: string; emoji: string }>;
}

export function TrackInfo({
  title,
  description,
  duration,
  mood,
  genre,
  moods,
  genres,
}: TrackInfoProps) {
  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getMoodEmoji = (moodId: string) => {
    return moods.find((m) => m.id === moodId)?.emoji || "🎵";
  };

  const getGenreEmoji = (genreId: string) => {
    return genres.find((g) => g.id === genreId)?.emoji || "🎶";
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold truncate">{title}</h3>
        {duration > 0 && (
          <span className="text-sm text-muted-foreground ml-2 flex-shrink-0">
            {formatDuration(duration)}
          </span>
        )}
      </div>
      {description && (
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
          {description}
        </p>
      )}
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          {getMoodEmoji(mood)}
          {moods.find((m) => m.id === mood)?.name}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          {getGenreEmoji(genre)}
          {genres.find((g) => g.id === genre)?.name}
        </Badge>
      </div>
    </div>
  );
}
