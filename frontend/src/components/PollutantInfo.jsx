import { 
  FaExclamationTriangle 
} from 'react-icons/fa'

import { 
  AlertTriangle,
  Wind,
  Cloud,
  Droplet,
  Thermometer
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card"

export default function PollutantInfo({ data }) {
  const pollutants = Object.entries(data.pollutants || {})
  if (pollutants.length === 0) return null

  const pollutantIcons = {
    pm25: AlertTriangle,
    pm10: Cloud,
    o3: Wind,
    no2: AlertTriangle,
    so2: AlertTriangle,
    co: AlertTriangle,
    t: Thermometer,
    h: Droplet,
    p: Wind,
    w: Wind,
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="p-6 shadow-xl backdrop-blur-xl bg-white/50 border-white/30">
        <CardHeader>
          <h3 className="text-3xl font-bold text-gray-900">Pollutant Details</h3>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">

            {pollutants.map(([key, pollutant]) => {
              const IconComponent = pollutantIcons[key] || FaExclamationTriangle

              return (
                <Card
                  key={key}
                  className="
                    bg-white/70 backdrop-blur-xl border border-gray-200
                    rounded-2xl shadow-lg p-6 transition-all duration-300
                    hover:shadow-2xl hover:-translate-y-2 hover:bg-white/90
                  "
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="
                      p-3 rounded-xl bg-gray-100 shadow-inner
                      transition-all duration-300
                      group-hover:shadow-md group-hover:bg-blue-50
                    ">
                      <IconComponent className="
                        w-6 h-6 text-gray-700
                        group-hover:text-blue-600 transition-colors duration-300
                      " />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {pollutant.name}
                      </h4>
                      <p className="text-xs text-gray-500 capitalize">
                        {key}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="
                      text-3xl font-extrabold text-gray-900
                      transition-colors duration-300 group-hover:text-blue-600
                    ">
                      {pollutant.value}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {pollutant.unit}
                    </p>
                  </div>

                </Card>
              )
            })}

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
