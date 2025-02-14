import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/prisma/client";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaidInCents || 0,
    numberOfSales: data._count,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { isAvailableForPurchase: true } }),
    prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return { activeCount, inactiveCount };
}

async function getSheinOrders() {
  const data = await prisma.sheinOrder.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaidInCents || 0,
    numberOfSales: data._count,
  };
}

export default async function AdminDashboard() {
  const [salesData, productData, sheinOrdersData] = await Promise.all([
    getSalesData(),
    getProductData(),
    getSheinOrders(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Orders from Shein"
        subtitle={`${formatNumber(sheinOrdersData.numberOfSales)} Shein Orders`}
        body={`${formatCurrency(sheinOrdersData.amount / 100)}`}
      />
      <DashboardCard
        title="Orders"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount / 100)}
      />

      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
