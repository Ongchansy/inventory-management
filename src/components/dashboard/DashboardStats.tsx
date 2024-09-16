import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react'

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1% from last month',
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: 'Subscriptions',
      value: '+2350',
      change: '+180.1% from last month',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Sales',
      value: '+12,234',
      change: '+19% from last month',
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      title: 'Active Now',
      value: '+573',
      change: '+201 since last hour',
      icon: <Activity className="h-6 w-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm  hover:shadow-lg transition-shadow">
          <CardHeader className="flex justify-between ">
            <CardTitle>{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <CardDescription className="text-sm text-orange-400">{stat.change}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default DashboardStats
