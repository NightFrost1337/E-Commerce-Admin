import { Link } from 'react-router-dom';
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Store, Users, LockKeyhole, Settings, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Header() {
	const { user } = useAuth();
	const { theme, setTheme } = useTheme();

    return (
		<div className="bg-background h-16 w-full border-b flex justify-between items-center py-4 px-6">
			<div className="flex items-center gap-8">
				<Select className="flex items-center gap-3 cursor-pointer">
					<SelectTrigger className="w-[180px] bg-transparent">
						<SelectValue placeholder="Select a Shop" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="store">
							<div className="flex items-center gap-2 py-1 cursor-pointer">
								<Store className={'block w-5 h-5'} />
								<span>Store 1</span>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
				<div className="flex justify-start items-center space-x-8">
					<Link to="/dashboard">Overview</Link>
					<Link to="/billsboard">Billsboard</Link>
					<Link to="/categories">Categories</Link>
					<Link to="/sizes">Sizes</Link>
					<Link to="/colors">Colors</Link>
					<Link to="/products">Products</Link>
					<Link to="/orders">Orders</Link>
				</div>
			</div>
			<div className="flex items-center gap-6">
				{theme === 'dark' ? <Moon className="cursor-pointer" onClick={() => setTheme('light')} /> : <Sun className="cursor-pointer" onClick={() => setTheme('dark')} />}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="flex items-center gap-4 cursor-pointer mr-2 select-none">
							<img className="h-6" src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`} alt="Avatar" />
							{/* <span>{user.username.lengh > 2 ? `${user.username.slice(0, 2)}...` : user.username}</span> */}
						</div>
					</ DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 mt-2 mr-[-0.5rem]" align="end" forceMount>
						<DropdownMenuLabel className="font-normal flex gap-2 items-center">
							<img className="h-6 rounded-full" src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`} alt="Avatar" />
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{user.username.lengh > 2 ? `${user.username.slice(0, 2)}...` : user.username}</p>
								<p className="text-xs leading-none text-muted-foreground">
								{user.email}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className={'cursor-pointer'}><Users className={'w-4 h-4 mr-2'} /> Account</DropdownMenuItem>
							<DropdownMenuItem className={'cursor-pointer'}><LockKeyhole className={'w-4 h-4 mr-2'} /> Subscription</DropdownMenuItem>
							<DropdownMenuItem className={'cursor-pointer'}><Settings className={'w-4 h-4 mr-2'} /> Settings</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className={'cursor-pointer text-red-500 focus:text-red-500'}><LogOut className={'w-4 h-4 mr-2'} />Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
    )
}