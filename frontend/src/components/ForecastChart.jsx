import { TrendingUp } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function ForecastChart({ data }) {
  if (!data.forecast?.daily) return null

  const pollutants = Object.keys(data.forecast.daily)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="p-6 shadow-xl backdrop-blur-xl bg-white/50 border-white/30">

        <CardHeader className="flex flex-row items-center gap-4 pb-6">
          <div className="p-3 bg-blue-100 rounded-2xl shadow-inner">
            <TrendingUp className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">3-Day Forecast</h3>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {pollutants.slice(0, 3).map((pollutant) => (
              <Card
                key={pollutant}
                className="
                  rounded-2xl p-6 bg-white/70 backdrop-blur-lg 
                  border border-gray-200 shadow-lg
                  transition-all duration-300
                  hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90
                "
              >
                <h4 className="
                  font-semibold text-gray-900 mb-6 text-lg capitalize
                  transition-colors group-hover:text-blue-600
                ">
                  {pollutant} Forecast
                </h4>

                <div className="space-y-4">
                  {data.forecast.daily[pollutant].slice(0, 3).map((day, index) => (
                    <div
                      key={index}
                      className="
                        flex justify-between items-center
                        bg-gray-100/70 p-4 rounded-xl border border-gray-200
                        transition-all duration-300
                        hover:bg-blue-50 hover:shadow-md
                      "
                    >
                      <span className="text-sm text-gray-600">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>

                      <span className="
                        font-semibold text-gray-900 text-lg
                        transition-colors group-hover:text-blue-700
                      ">
                        {day.average} μg/m³
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
