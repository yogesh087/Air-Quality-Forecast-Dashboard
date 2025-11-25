"use client";

import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SearchSection({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  const popularCities = ["London", "New York", "Tokyo", "Paris", "Delhi", "Beijing"];

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <Card className="
        bg-white/60 backdrop-blur-2xl 
        border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        rounded-3xl transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      ">
        
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-inner">
              <MapPin className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Air Quality Index
            </h1>
          </div>
          <p className="text-gray-600 text-base">
            Search real-time air quality data for any city worldwide.
          </p>
        </CardHeader>

        <CardContent className="space-y-8 px-6 pb-8">
         
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative group">
              <Search className="
                absolute left-4 top-1/2 -translate-y-1/2 text-black font-bold
                group-focus-within:text-blue-600 transition-colors
              " />
              
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city..."
                disabled={loading}
                className="
                  pl-12 h-14 text-lg rounded-2xl border-gray-300 shadow-sm
                  focus:ring-2 focus:ring-blue-400/50 focus:border-blue-500
                  transition-all
                "
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !city.trim()}
              className="
                h-14 px-7 rounded-2xl text-lg font-semibold 
                bg-gradient-to-r from-blue-600 to-blue-500 text-white
                hover:from-blue-700 hover:to-blue-600
                shadow-md hover:shadow-lg transition-all
                flex items-center gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </Button>
          </form>

          <Separator className="bg-gray-300/40" />

          {/* Popular Cities */}
          <div className="text-center">
            <p className="text-gray-600 mb-4 text-sm">Try these popular cities:</p>

            <div className="flex flex-wrap justify-center gap-3">
              {popularCities.map((popularCity) => (
                <Badge
                  key={popularCity}
                  onClick={() => {
                    setCity(popularCity);
                    onSearch(popularCity);
                  }}
                  className="
                    px-4 py-2 text-sm cursor-pointer rounded-xl
                    bg-gray-100 hover:bg-blue-100 hover:text-blue-700
                    border border-gray-300/40
                    transition-all shadow-sm hover:shadow-md
                  "
                >
                  {popularCity}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
