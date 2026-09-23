import { BookOpen, Calendar, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";
import { currentUser } from "@/lib/mock-data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  // { title: "ตารางเรียน", url: "/schedule", icon: Calendar },
  // { title: "ตั้งค่า", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ✅ แก้ไข: Base UI ใช้ `render={<Link />}` แทน `asChild` */}
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2 p-2">
          <Separator/>
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Avatar className="aspect-square  object-cover">
              <AvatarImage src={currentUser.avatar}/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{currentUser.nickname}</span>
              <Badge variant="outline" className="text-[10px]">{currentUser.role}</Badge>
            </div>
          </div>
        </SidebarFooter>
    </Sidebar>
  );
}
