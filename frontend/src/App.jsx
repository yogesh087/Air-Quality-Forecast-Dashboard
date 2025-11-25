import { useState } from "react"
import { AlertTriangle } from "lucide-react"

import { airQualityAPI } from "./api"
import SearchSection from "./components/SearchSection"
import AQIDisplay from "./components/AQIDisplay"
import PollutantInfo from "./components/PollutantInfo"
import ForecastChart from "./components/ForecastChart"

import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (city) => {
    setLoading(true)
    setError("")
    setData(null)

    try {
      const result = await airQualityAPI.searchCity(city)
      setData(result)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch air quality data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        min-h-screen py-10 
        bg-gradient-to-br from-sky-100 via-white to-emerald-100
        relative overflow-hidden
      "
    >
      <div className="container mx-auto px-4 relative z-10">
        
       
        <h1
          className="
            text-4xl md:text-5xl font-extrabold text-center mb-10
            bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600
            drop-shadow-lg
          "
        >
          Air Quality & Forecast Dashboard
        </h1>

       
        <div className="max-w-3xl mx-auto mb-10">
          <SearchSection onSearch={handleSearch} loading={loading} />
        </div>

       
        {error && (
          <Alert
            variant="destructive"
            className="
              max-w-4xl mx-auto mb-10 
              bg-red-50/70 backdrop-blur-xl border border-red-300/60
              rounded-2xl shadow-xl
            "
          >
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

      
        {loading && (
          <div className="space-y-10 max-w-6xl mx-auto">
            <Card className="p-10 bg-white/40 backdrop-blur-xl border">
              <Skeleton className="h-8 w-60 mb-6" />
              <Skeleton className="h-5 w-40 mb-4" />
              <Skeleton className="h-40 w-full rounded-xl" />
            </Card>

            <Card className="p-10 bg-white/40 backdrop-blur-xl border">
              <Skeleton className="h-8 w-52 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </Card>
          </div>
        )}

        
        {data && !loading && (
          <div
            className="
              space-y-12 
              animate-fade-in-up duration-700 
            "
          >
            <AQIDisplay data={data} />
            <PollutantInfo data={data} />
            <ForecastChart data={data} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
