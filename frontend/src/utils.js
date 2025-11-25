export function getAqiLevel(aqi) {
  if (aqi <= 50) return { 
    level: 'Good', 
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
  }
  if (aqi <= 100) return { 
    level: 'Moderate', 
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-300',
    description: 'Air quality is acceptable. However, there may be a risk for some people.'
  }
  if (aqi <= 150) return { 
    level: 'Unhealthy for Sensitive Groups', 
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    description: 'Members of sensitive groups may experience health effects.'
  }
  if (aqi <= 200) return { 
    level: 'Unhealthy', 
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    description: 'Some members of the general public may experience health effects.'
  }
  if (aqi <= 300) return { 
    level: 'Very Unhealthy', 
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
    description: 'Health alert: The risk of health effects is increased for everyone.'
  }
  return { 
    level: 'Hazardous', 
    color: 'text-red-800',
    bgColor: 'bg-red-200',
    borderColor: 'border-red-400',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.'
  }
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}