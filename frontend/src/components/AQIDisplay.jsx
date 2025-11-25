import { Gauge, Clock, MapPin, Database } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { getAqiLevel, formatDate } from "../utils"

export default function AQIDisplay({ data }) {
  const aqiLevel = getAqiLevel(data.aqi)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">

      
      <Card
        className="
          p-10 rounded-3xl bg-white/50 backdrop-blur-xl 
          border border-white/30 shadow-xl
          transition-all duration-300
          hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1
        "
      >
        <CardHeader className="mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
             
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-2xl shadow-inner">
                  <MapPin className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{data.city}</h2>
              </div>

              <div className="flex items-center gap-5 flex-wrap text-gray-700">
                
                {/* LAST UPDATED */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    Last updated: {formatDate(data.time.measurement)}
                  </span>
                </div>

                
                {data.cached && (
                  <div className="flex items-center gap-2 text-blue-700">
                    <Database className="w-5 h-5" />
                    <span className="text-sm font-medium">Cached Data</span>
                  </div>
                )}
              </div>
            </div>

            
            <Card
              className="
                text-center bg-white/70 backdrop-blur-xl rounded-2xl 
                p-6 border border-gray-200 shadow-lg
                transition-all group-hover:shadow-2xl
              "
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gauge className="w-7 h-7 text-gray-700" />
                <span className="text-lg font-semibold text-gray-700">AQI</span>
              </div>

              <div className={`text-6xl font-bold ${aqiLevel.color} mb-3`}>
                {data.aqi}
              </div>

              <div
                className={`
                  px-5 py-2 rounded-full border
                  ${aqiLevel.bgColor}
                  ${aqiLevel.borderColor}
                `}
              >
                <span className={`font-semibold ${aqiLevel.color}`}>
                  {aqiLevel.level}
                </span>
              </div>
            </Card>
          </div>
        </CardHeader>

        <CardContent>
       
          <div className="mb-8">
            <div className="flex h-4 rounded-full overflow-hidden shadow-inner">
              <div className="flex-1 bg-green-500"></div>
              <div className="flex-1 bg-yellow-400"></div>
              <div className="flex-1 bg-orange-500"></div>
              <div className="flex-1 bg-red-500"></div>
              <div className="flex-1 bg-purple-600"></div>
              <div className="flex-1 bg-red-800"></div>
            </div>

            <div className="flex justify-between text-xs text-gray-600 font-medium mt-2">
              <span>0-50</span>
              <span>51-100</span>
              <span>101-150</span>
              <span>151-200</span>
              <span>201-300</span>
              <span>301+</span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Good</span>
              <span>Moderate</span>
              <span>USG</span>
              <span>Unhealthy</span>
              <span>Very Unhealthy</span>
              <span>Hazardous</span>
            </div>
          </div>

          
          <Card
            className={`
              p-5 rounded-xl border shadow-sm
              ${aqiLevel.bgColor}
              ${aqiLevel.borderColor}
            `}
          >
            <p className={`text-sm font-medium ${aqiLevel.color}`}>
              {aqiLevel.description}
            </p>
          </Card>
        </CardContent>
      </Card>

      
      {data.dominantPollutant && data.dominantPollutant !== "N/A" && (
        <Card
          className="
            bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/40
            shadow-xl transition-all duration-300
            hover:shadow-2xl hover:-translate-y-1 hover:bg-white/80
          "
        >
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900">Dominant Pollutant</h3>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <span className="text-lg text-gray-700 capitalize">
              {data.pollutants[data.dominantPollutant]?.name || data.dominantPollutant}
            </span>

            <span className="text-2xl font-bold text-gray-900">
              {data.pollutants[data.dominantPollutant]?.value || "N/A"}
              <span className="text-sm text-gray-600 ml-1">
                {data.pollutants[data.dominantPollutant]?.unit}
              </span>
            </span>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
