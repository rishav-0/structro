'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { Container } from '@/components/ui/container';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	Waypoints,
	Building2,
	HardHat,
	Waves,
	Info,
	FolderOpen,
	Mail,
	Calendar,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
					scrolled,
			})}
		>
			<Container className="h-16 flex items-center justify-between">
				<div className="flex items-center gap-5">
					<Link href="/" className="flex items-center gap-2">
						<div className="bg-primary p-1.5 rounded-lg">
							<div className="w-5 h-5 bg-white rounded-sm transform rotate-45 flex items-center justify-center">
								<div className="w-2 h-2 bg-primary rounded-full"></div>
							</div>
						</div>
						<span className="text-xl font-bold tracking-tight text-primary">STRUCTRO</span>
					</Link>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-sm font-semibold uppercase tracking-wide">Services</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5">
									<ul className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
										{servicesLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-2">
										<p className="text-muted-foreground text-sm">
											Need technical consultation?{' '}
											<a href="/contact" className="text-foreground font-medium hover:underline">
												Request Now
											</a>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-sm font-semibold uppercase tracking-wide">Projects</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<div className="grid w-lg grid-cols-1 gap-2">
										<ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
											{projectsLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className="px-4 text-sm font-semibold uppercase tracking-wide" asChild>
									<a href="/about" className="hover:bg-accent hover:text-accent-foreground rounded-md p-2">
										About Us
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className="px-4 text-sm font-semibold uppercase tracking-wide" asChild>
									<a href="/contact" className="hover:bg-accent hover:text-accent-foreground rounded-md p-2">
										Contact
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline" className="rounded-sm text-sm">Get a Quote</Button>
					<Button className="rounded-sm bg-accent text-gray-900 hover:bg-yellow-400 text-sm font-semibold">
						Request Consultation
					</Button>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden rounded-sm"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</Container>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-2">
						<span className="text-sm font-semibold uppercase">Services</span>
						{servicesLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<span className="text-sm font-semibold uppercase mt-4">Projects</span>
						{projectsLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<ListItem title="About Us" href="/about" icon={Info} description="Learn our story and values" />
						<ListItem title="Contact" href="/contact" icon={Mail} description="Get in touch with us" />
					</div>
				</NavigationMenu>
				<div className="flex flex-col gap-2 mt-4">
					<Button variant="outline" className="w-full rounded-sm bg-transparent">
						Get a Quote
					</Button>
					<Button className="w-full rounded-sm bg-accent text-gray-900 hover:bg-yellow-400 font-semibold">
						Request Consultation
					</Button>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2', className)} {...props} asChild>
			<a href={href}>
				<div className="bg-primary/10 flex aspect-square size-10 items-center justify-center rounded-md border shadow-sm">
					<Icon className="text-primary size-5" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-muted-foreground text-xs">{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

// Structro Infra Tech - Services Links
const servicesLinks: LinkItem[] = [
	{
		title: 'Bridge Engineering',
		href: '/services#bridge',
		description: 'Open Web, Railway, Highway, Foot Over',
		icon: Waypoints,
	},
	{
		title: 'PEB Buildings',
		href: '/services#peb',
		description: 'Pre-Engineered Building Solutions',
		icon: Building2,
	},
	{
		title: 'Steel Structures',
		href: '/services#steel',
		description: 'Industrial Warehousing & Sheds',
		icon: HardHat,
	},
	{
		title: 'Water Staging',
		href: '/services#water',
		description: 'Specialized Water Infrastructure',
		icon: Waves,
	},
];

// Structro Infra Tech - Projects Links
const projectsLinks: LinkItem[] = [
	{
		title: 'Ongoing Projects',
		href: '/projects#ongoing',
		description: 'Current construction work',
		icon: Calendar,
	},
	{
		title: 'Completed Projects',
		href: '/projects#completed',
		description: 'Successfully delivered projects',
		icon: FolderOpen,
	},
];


function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
