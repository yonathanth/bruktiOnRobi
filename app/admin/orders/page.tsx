import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/client";
import { formatCurrency } from "@/lib/formatters";
import { PageHeader } from "../_components/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./_components/OrderActions";

function getOrders() {
  return prisma.order.findMany({
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      pricePaidInCents: true,
      shippingAddress: true,
      quantity: true,
      product: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

function getSheinOrders() {
  return prisma.sheinOrder.findMany({
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      description: true,
      url: true,
      quantity: true,
      pricePaidInCents: true,
      shippingAddress: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default function OrdersPage() {
  return (
    <>
      <PageHeader>Sales</PageHeader>
      <OrdersTable />
    </>
  );
}

async function OrdersTable() {
  const [orders, sheinOrders] = await Promise.all([
    getOrders(),
    getSheinOrders(),
  ]);

  if (orders.length === 0 && sheinOrders.length === 0)
    return <p>No sales found</p>;

  return (
    <>
      <h2 className="font-extrabold text-xl my-8">Orders</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Phone Number</TableHead>

            <TableHead>Product</TableHead>

            <TableHead>Price Paid</TableHead>

            <TableHead>Shipping Address</TableHead>

            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.phoneNumber}</TableCell>
              <TableCell>{`${order.product.name} (${order.quantity})`}</TableCell>

              <TableCell>
                {formatCurrency(order.pricePaidInCents / 100)}
              </TableCell>
              <TableCell>{order.shippingAddress}</TableCell>

              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={order.id} type={"normal"} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <hr className="my-20" />
      <h2 className="font-extrabold text-xl">Shein Order</h2>
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Phone Number</TableHead>
            <TableHead>SheinLink</TableHead>
            <TableHead>Details</TableHead>

            <TableHead>Price Paid</TableHead>
            <TableHead>Shipping Address</TableHead>

            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sheinOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <a
                  href={order.url}
                  target="_blank"
                  className="text-blue-500 font-bold"
                >
                  Link
                </a>
              </TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.phoneNumber}</TableCell>
              <TableCell>{order.description}</TableCell>

              <TableCell>
                {formatCurrency(order.pricePaidInCents / 100)}
              </TableCell>
              <TableCell>{order.shippingAddress}</TableCell>

              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropDownItem id={order.id} type={"shein"} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
