import { useState, useMemo } from "react";
import { MapPin, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { galleryItems } from "../data/gallery";

const COUNTRIES = [...new Set(galleryItems.map((i) => i.country))];

export default function GalleryPage() {
  const [countryFilter, setCountryFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () =>
      countryFilter
        ? galleryItems.filter((i) => i.country === countryFilter)
        : galleryItems,
    [countryFilter],
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
            Heritage Gallery
          </p>
          <h1 className="mt-2 text-4xl font-bold text-warm-950 md:text-5xl font-display">
            Stories from the Homeland
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-warm-600">
            Authentic moments captured by local communities. These are not
            tourism advertisements — they are glimpses of the places your
            ancestors called home, uploaded by the people who still live there.
          </p>
        </div>

        {/* Country filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setCountryFilter("")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!countryFilter ? "bg-accent-500 text-white" : "bg-warm-100 text-warm-700 hover:bg-warm-200"}`}
          >
            All
          </button>
          {COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(countryFilter === c ? "" : c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${countryFilter === c ? "bg-accent-500 text-white" : "bg-warm-100 text-warm-700 hover:bg-warm-200"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {filtered.map((item, i) => {
            // Vary the aspect ratio for visual interest
            const spans = [
              "aspect-[3/4]",
              "aspect-[4/5]",
              "aspect-square",
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-[4/3]",
              "aspect-square",
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-[4/3]",
            ];
            return (
              <div
                key={item.id}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <div
                  className={`relative overflow-hidden rounded-xl ${spans[i % spans.length]} bg-warm-100`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Type badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="outline"
                      className="bg-white/90 backdrop-blur text-warm-800 border-0 text-xs"
                    >
                      {item.type === "Video" ? (
                        <Play className="mr-1 h-3 w-3 inline" />
                      ) : null}
                      {item.type}
                    </Badge>
                  </div>

                  {/* Title overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base font-semibold text-white font-display leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-white/70 text-xs">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{item.subtitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-warm-500">
            {filtered.length} {filtered.length === 1 ? "story" : "stories"} from{" "}
            {countryFilter || "all four countries"}
          </p>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="p-0 max-w-3xl overflow-y-auto">
            <div className="aspect-[16/10] w-full bg-primary-950 overflow-hidden rounded-t-2xl">
              <img
                src={selected.image}
                alt={selected.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="accent">{selected.type}</Badge>
                <Badge variant="outline">{selected.country}</Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-warm-950 font-display">
                {selected.title}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mt-1 text-warm-500 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selected.subtitle}</span>
              </div>
              <DialogDescription className="mt-4 text-warm-700 leading-relaxed text-base">
                {selected.description}
              </DialogDescription>
              {selected.highlights && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-warm-400 mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.highlights.map((h) => (
                      <Badge key={h} variant="secondary">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
