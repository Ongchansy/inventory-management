"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UseCategoryStore } from "@/store/useCategoryStore";
import { UseProductStore } from "@/store/useProductStore";
import { UseSupplierStore } from "@/store/useSupplierStore";
import { UseUserStore } from "@/store/useTransactionStore";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { useEffect } from "react";

const DashboardStats = () => {
  const { categories, fetchCategories } = UseCategoryStore();
  const { users, fetchUsers } = UseUserStore();
  const { products, fetchProducts } = UseProductStore();
  const { suppliers, fetchSuppliers } = UseSupplierStore();

  useEffect(() => {
    fetchCategories();
    fetchUsers();
    fetchProducts();
    fetchSuppliers();
  }, [fetchCategories, fetchUsers, fetchProducts, fetchSuppliers]);

  const stats = [
    {
      title: "Total Suppliers",
      value: `${suppliers?.length || 0}`,
      change: "+20.1% from last month",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Total Users",
      value: `${users?.length || 0}`,
      change: "+180.1% from last month",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Categories",
      value: `${categories?.length || 0}`,
      change: "+19% from last month",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      title: "Total Products",
      value: `${products?.length || 0}`,
      change: "+201 since last hour",
      icon: <Activity className="h-6 w-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm hover:shadow-lg transition-shadow">
          <CardHeader className="flex justify-between">
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
  );
};

export default DashboardStats;

