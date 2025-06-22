import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Play,
  Pause,
  Download,
  Heart,
  HeartOff,
  Music,
  Sparkles,
  DeleteIcon,
} from "lucide-react";
import { useStore } from "./store/music-store";
import { ThemeToggle } from "./components/theme-toggle";
import { ProgressBar } from "./components/progress-bar";
import { music } from "./data/music-data";
import { moods, genres } from "./data/app-data";
import { TrackInfo } from "./components/track-info";
import { AudioProgress } from "./components/audio-progress";

interface Track {
  id: string;
  title: string;
  description?: string;
  mood: string;
  genre: string;
  audioUrl: string;
  duration: number;
}

export default function App() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const {
    likedTracks,
    recentTracks,
    addLikedTrack,
    removeLikedTrack,
    addRecentTrack,
    isTrackLiked,
    clearRecentTracks,
    clearLikedTracks,
  } = useStore();

  useEffect(() => {
    if (audio) {
      const updateProgress = () => {
        if (audio.duration) {
          const currentTime = audio.currentTime;
          const duration = audio.duration;
          setCurrentTime(currentTime);
          setDuration(duration);
          setProgress((currentTime / duration) * 100);
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [audio]);

  const generateTrack = async () => {
    if (!selectedMood || !selectedGenre) return;

    setIsGenerating(true);
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);

    if (audio) {
      audio.pause();
      setAudio(null);
    }

    try {
      // Get tracks for the selected mood
      const moodTracks = music[selectedMood as keyof typeof music];

      if (!moodTracks || moodTracks.length === 0) {
        throw new Error("No tracks found for this mood");
      }

      // Select a random track from the mood category
      const randomTrack =
        moodTracks[Math.floor(Math.random() * moodTracks.length)];

      // Create the response track object
      const track: Track = {
        id: `${selectedMood}_${randomTrack.id}_${Date.now()}`,
        title: randomTrack.name,
        description: randomTrack.description,
        mood: selectedMood,
        genre: selectedGenre,
        audioUrl: randomTrack.track,
        duration: 0, // Will be set when audio loads
      };

      // Simulate generation time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCurrentTrack(track);
      addRecentTrack(track);

      // Create audio element
      const newAudio = new Audio(track.audioUrl);
      setAudio(newAudio);
    } catch (error) {
      console.error("Failed to generate track:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    if (!currentTrack) return;

    if (isTrackLiked(currentTrack.id)) {
      removeLikedTrack(currentTrack.id);
    } else {
      addLikedTrack(currentTrack);
    }
  };

  const downloadTrack = () => {
    if (!currentTrack) return;

    const link = document.createElement("a");
    link.href = currentTrack.audioUrl;
    link.download = `${currentTrack.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMoodEmoji = (moodId: string) => {
    return moods.find((m) => m.id === moodId)?.emoji || "🎵";
  };

  const getGenreEmoji = (genreId: string) => {
    return genres.find((g) => g.id === genreId)?.emoji || "🎶";
  };

  const playTrackFromList = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(track.audioUrl);
    setAudio(newAudio);
    setIsPlaying(false);
  };

  const seekToTime = (time: number) => {
    if (audio && duration > 0) {
      audio.currentTime = time;
      setCurrentTime(time);
      setProgress((time / duration) * 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Wubble QuickTune Mini
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                AI Music Preview Generator
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Generator */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Generate Your Perfect Track
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood & Genre Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Your Mood</label>
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((mood) => (
                      <SelectItem key={mood.id} value={mood.id}>
                        <div className="flex items-center gap-2">
                          <span>{mood.emoji}</span>
                          <span>{mood.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Your Genre</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a genre..." />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id}>
                        <div className="flex items-center gap-2">
                          <span>{genre.emoji}</span>
                          <span>{genre.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateTrack}
              disabled={!selectedMood || !selectedGenre || isGenerating}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline">
                    Generating Your Track...
                  </span>
                  <span className="sm:hidden">Generating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Track
                </div>
              )}
            </Button>

            {/* Progress Bar */}
            {isGenerating && <ProgressBar />}
          </CardContent>
        </Card>

        {/* Track Preview */}
        {currentTrack && (
          <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                <div className="flex-1">
                  <TrackInfo
                    title={currentTrack.title}
                    description={currentTrack.description}
                    duration={duration}
                    mood={currentTrack.mood}
                    genre={currentTrack.genre}
                    moods={moods}
                    genres={genres}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLike}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 self-start sm:self-center"
                >
                  {isTrackLiked(currentTrack.id) ? (
                    <Heart className="w-6 h-6 fill-current" />
                  ) : (
                    <HeartOff className="w-6 h-6" />
                  )}
                </Button>
              </div>

              {/* Audio Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex-shrink-0"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                    )}
                  </Button>

                  <AudioProgress
                    currentTime={currentTime}
                    duration={duration}
                    progress={progress}
                    onSeek={seekToTime}
                  />

                  <Button
                    onClick={downloadTrack}
                    variant="outline"
                    size="icon"
                    className="rounded-full flex-shrink-0"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent & Liked Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tracks */}
          {recentTracks.length > 0 && (
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Tracks</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearRecentTracks}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 absolute top-3 right-3"
                >
                  <DeleteIcon className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTracks.slice(0, 3).map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {track.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getMoodEmoji(track.mood)}{" "}
                            {moods.find((m) => m.id === track.mood)?.name}
                          </Badge>
                            <Badge variant="outline" className="text-xs">
                            {getGenreEmoji(track.genre)}{" "}
                            {genres.find((g) => g.id === track.genre)?.name}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playTrackFromList(track)}
                        className="flex-shrink-0 ml-2"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Liked Tracks */}
          {likedTracks.length > 0 && (
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                  Liked Tracks
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearLikedTracks}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 absolute top-3 right-3"
                >
                  <DeleteIcon className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {likedTracks.slice(0, 3).map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {track.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                           <Badge variant="outline" className="text-xs">
                            {getMoodEmoji(track.mood)}{" "}
                            {moods.find((m) => m.id === track.mood)?.name}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getGenreEmoji(track.genre)}{" "}
                            {genres.find((g) => g.id === track.genre)?.name}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playTrackFromList(track)}
                        className="flex-shrink-0 ml-2"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
