/** @format */

import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { useSidebar } from "../../contexts/SidebarContext";
import {
	LayoutDashboard,
	Megaphone,
	MapPin,
	FileText,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Target,
	BarChart3,
	Zap,
	Calendar,
	Settings,
} from "lucide-react";

interface NavItem {
	name: string;
	href: string;
	icon: React.ElementType;
}

interface NavSection {
	title: string;
	items: NavItem[];
}

const mainSections: NavSection[] = [
	{
		title: "Dashboard",
		items: [
			{ name: "Overview", href: "/dashboard", icon: LayoutDashboard },
		],
	},
	{
		title: "Campaign Planning",
		items: [
			{ name: "Explore Inventories", href: "/explore", icon: MapPin },
			{ name: "My Campaigns", href: "/campaigns", icon: Megaphone },
			{ name: "Plan Campaign", href: "/campaigns/new", icon: Target },
			{ name: "Quick Quote", href: "/quote", icon: FileText },
		],
	},
	{
		title: "Reports",
		items: [
			{ name: "Campaign Analytics", href: "/analytics", icon: BarChart3 },
			{ name: "Booking History", href: "/history", icon: Calendar },
		],
	},
	{
		title: "Preferences",
		items: [
			{ name: "Settings", href: "/settings", icon: Settings },
		],
	},
];

export function Sidebar() {
	const { isCollapsed, setIsCollapsed } = useSidebar();
	const [expandedSections, setExpandedSections] = useState<{
		[key: string]: boolean;
	}>({
		Dashboard: true,
		"Campaign Planning": true,
		Reports: true,
		Preferences: true,
	});

	const toggleSection = (title: string) => {
		setExpandedSections((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	return (
		<aside
			className={clsx(
				"fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col transition-all duration-300",
				isCollapsed ? "w-20" : "w-72",
			)}>
			{/* Logo */}
			<div className='h-20 flex items-center justify-between px-5 border-b border-gray-200 dark:border-slate-800'>
				{!isCollapsed && (
					<div className='flex items-center gap-3'>
						<div className="w-48 h-16 bg-linear-to-br from-blue-800 via-purple-900 to-pink-700 rounded-xl shadow-lg">
							<img
								src='https://res.cloudinary.com/dipqldzry/image/upload/v1754385797/logo_yxzllg.svg'
								alt='Xchange Logo'
								className='h-14 w-auto mx-auto'
							/>
						</div>
					</div>
				)}

				{isCollapsed && (
					<div className='w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mx-auto'>
						<Zap className='w-6 h-6 text-white' />
					</div>
				)}

				{/* Toggle Button */}
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={clsx(
						"p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors",
						isCollapsed &&
							"absolute -right-3 top-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md",
					)}>
					{isCollapsed ? (
						<ChevronRight className='w-4 h-4 text-gray-600 dark:text-gray-400' />
					) : (
						<ChevronLeft className='w-4 h-4 text-gray-600 dark:text-gray-400' />
					)}
				</button>
			</div>

			{/* Main Navigation */}
			<nav className='flex-1 px-3 py-6 space-y-1 overflow-y-auto'>
				{mainSections.map((section) => (
					<div key={section.title} className='mb-1'>
						{/* Section Header */}
						{!isCollapsed && (
							<button
								onClick={() => toggleSection(section.title)}
								className='w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors'>
								<span>{section.title}</span>
								<ChevronDown
									className={clsx(
										"w-4 h-4 transition-transform",
										expandedSections[section.title] &&
											"rotate-180",
									)}
								/>
							</button>
						)}

						{/* Section Items */}
						{(isCollapsed || expandedSections[section.title]) && (
							<div
								className={clsx(
									"space-y-1",
									isCollapsed ? "mt-0" : "mt-1",
								)}>
								{section.items.map((item) => (
									<NavLink
										key={item.name}
										to={item.href}
										title={
											isCollapsed ? item.name : undefined
										}
										className={({ isActive }) =>
											clsx(
												"flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200",
												isCollapsed
													? "justify-center"
													: "",
												isActive
													? "bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-cyan-400 shadow-sm"
													: "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white",
											)
										}>
										{({ isActive }) => (
											<>
												<div
													className={clsx(
														"p-2 rounded-lg transition-colors shrink-0",
														isActive
															? "bg-blue-100 dark:bg-slate-700"
															: "bg-gray-100 dark:bg-slate-800",
													)}>
													<item.icon
														className={clsx(
															"w-4 h-4",
															isActive
																? "text-blue-700 dark:text-cyan-400"
																: "text-gray-600 dark:text-gray-400",
														)}
													/>
												</div>
												{!isCollapsed && (
													<span className='tracking-wide'>
														{item.name}
													</span>
												)}
											</>
										)}
									</NavLink>
								))}
							</div>
						)}
					</div>
				))}
			</nav>

			{/* Bottom Info */}
			{!isCollapsed && (
				<div className='p-4 border-t border-gray-200 dark:border-slate-800'>
					<div className='bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-4'>
						<div className='flex items-center gap-2 mb-2'>
							<Zap className='w-4 h-4 text-blue-600 dark:text-cyan-400' />
							<p className='text-xs font-bold text-gray-900 dark:text-white tracking-wide'>
								Digital Inventories Kenya
							</p>
						</div>
						<p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
							Plan your campaign, we handle the rest
						</p>
					</div>
				</div>
			)}
		</aside>
	);
}
