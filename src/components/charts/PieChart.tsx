"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { UseProductStore } from "@/store/useProductStore"
import { UseCategoryStore } from "@/store/useCategoryStore"
import { UseSupplierStore } from "@/store/useSupplierStore"
import { UseUserStore } from "@/store/useTransactionStore"

export const description = "A donut chart with text"

export function PieCharts() {
  const { products, fetchProducts } = UseProductStore()
  const { categories, fetchCategories } = UseCategoryStore()
  const { suppliers, fetchSuppliers } = UseSupplierStore()
  const { users, fetchUsers } = UseUserStore()

  // Use useMemo to memoize chartData based on dependencies
  const chartData = React.useMemo(() => [
    { name: "Users", visitors: users.length, fill: "var(--color-chrome, #ff6384)" },
    { name: "Products", visitors: products.length, fill: "var(--color-safari, #36a2eb)" },
    { name: "Suppliers", visitors: suppliers.length, fill: "var(--color-firefox, #ffce56)" },
    { name: "Categories", visitors: categories.length, fill: "var(--color-edge, #4bc0c0)" },
  ], [users.length, products.length, suppliers.length, categories.length]) // Dependencies for memoization

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  React.useEffect(() => {
    fetchProducts()
    fetchCategories()
    fetchSuppliers()
    fetchUsers()
  }, [fetchProducts, fetchCategories, fetchSuppliers, fetchUsers])

  const chartConfig = {
    users: {
      label: "Users",
    },
    product: {
      label: "Products",
      color: "hsl(var(--chart-1))",
    },
    suppliers: {
      label: "Suppliers",
      color: "hsl(var(--chart-2))",
    },
    category: {
      label: "Categories",
      color: "hsl(var(--chart-3))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
