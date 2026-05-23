'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { Container } from '@/components/ui/container';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';
import { 
    FolderOpen, 
    LucideIcon,
 	Waypoints,
 	Building2,
 	Info,
 	Mail,
 	Home,
    Package,
    Briefcase,
    FileText,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const pathname = usePathname();
	const scrolled = useScroll(10);
	
	const isHome = pathname === '/';
	const isTransparent = isHome && !scrolled;

	React.useEffect(() => {
		setOpen(false);
	}, [pathname]);

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
			className={cn('fixed top-0 z-50 w-full transition-all duration-300', {
				'bg-background/95 border-b border-border backdrop-blur-lg shadow-sm':
					scrolled || !isHome,
				'bg-transparent border-transparent':
					isTransparent,
			})}
		>
			<Container className="flex h-16 items-center justify-between gap-4">
				<div className="flex items-center gap-5">
					<Link href="/" className="flex items-center gap-2 group">
						<div className="relative w-10 h-10 transition-all duration-300">
							<Image 
								src="/images/transparantLogo.png" 
								alt="Structro Logo" 
								fill
								className={cn("object-contain transition-opacity duration-300", 
									isTransparent ? "opacity-100 invert" : "opacity-0"
								)}
							/>
							<Image 
								src="/images/logo.png" 
								alt="Structro Logo" 
								fill
								className={cn("object-contain transition-opacity duration-300", 
									isTransparent ? "opacity-0" : "opacity-100"
								)}
							/>
						</div>
					</Link>
					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/services">
										Services
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/process">
										Process
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/projects">
										Projects
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/products">
										Products
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/about">
										About Us
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/careers">
										Careers
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/blogs">
										Blog
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink className={cn("px-4 text-xs font-bold uppercase tracking-widest transition-colors", 
									isTransparent ? "text-white hover:text-accent" : "text-foreground hover:text-primary"
								)} asChild>
									<Link href="/contact">
										Contact
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-2 lg:flex">
					{/* <Link href="/process">
						<Button variant="outline" className={cn("rounded-sm text-xs font-bold border-secondary transition-colors", 
							isTransparent ? "text-white hover:bg-white hover:text-black" : "text-black hover:bg-secondary"
						)}>OUR PROCESS</Button>
					</Link> */}
					<Link href="/contact">
						<Button className="rounded-sm bg-primary text-white hover:bg-primary/90 text-xs font-bold tracking-widest">
							REQUEST QUOTE
						</Button>
					</Link>
				</div>
				<div className="flex lg:hidden items-center gap-2 shrink-0">
					<Button
						size="icon"
						variant="outline"
						onClick={() => setOpen(!open)}
						className={cn(
							'rounded-sm border-white/20 shadow-sm transition-colors',
							isTransparent
								? 'bg-black/45 text-white backdrop-blur-md hover:bg-black/60 hover:text-white'
								: 'bg-background text-foreground hover:bg-accent'
						)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label="Toggle menu"
					>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</Container>
			<MobileMenu open={open} className="flex flex-col justify-between gap-3 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-2">
						<ListItem title="Services" href="/services" icon={Building2} description="View our core services" onNavigate={() => setOpen(false)} />
						<ListItem title="Process" href="/process" icon={Waypoints} description="Discover our engineering workflow" onNavigate={() => setOpen(false)} />
						<ListItem title="Projects" href="/projects" icon={FolderOpen} description="Browse our project portfolio" onNavigate={() => setOpen(false)} />
						<ListItem title="Products" href="/products" icon={Package} description="Browse fabricated product solutions" onNavigate={() => setOpen(false)} />
						<ListItem title="About Us" href="/about" icon={Info} description="Learn our story and values" onNavigate={() => setOpen(false)} />
						<ListItem title="Careers" href="/careers" icon={Briefcase} description="Join our team" onNavigate={() => setOpen(false)} />
						<ListItem title="Blog" href="/blogs" icon={FileText} description="Latest updates and insights" onNavigate={() => setOpen(false)} />
						<ListItem title="Contact" href="/contact" icon={Mail} description="Get in touch with us" onNavigate={() => setOpen(false)} />
					</div>
				</NavigationMenu>
				<div className="flex flex-col gap-2 mt-4">
					<Link href="/process" className="w-full" onClick={() => setOpen(false)}>
						<Button variant="outline" className="w-full rounded-sm border-secondary text-secondary-foreground hover:bg-secondary">
							Our Process
						</Button>
					</Link>
					<Link href="/contact" className="w-full" onClick={() => setOpen(false)}>
						<Button className="w-full rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
							Request Consultation
						</Button>
					</Link>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

type ListItemProps = React.ComponentProps<typeof NavigationMenuLink> &
	LinkItem & {
		onNavigate?: () => void;
	};

function MobileMenu({ open, children, className }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/98 supports-backdrop-filter:bg-background/92 backdrop-blur-xl',
				'fixed top-16 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y lg:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full bg-background/90 p-4',
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
	onNavigate,
}: ListItemProps) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-3 rounded-sm border border-border/70 bg-background px-3 py-3 shadow-sm transition-colors data-[active=true]:bg-accent/60 data-[active=true]:text-accent-foreground hover:bg-accent/70 hover:text-accent-foreground focus:bg-accent/70 focus:text-accent-foreground', className)} asChild>
			<Link href={href} onClick={onNavigate}>
				<div className="flex aspect-square size-11 items-center justify-center rounded-md border border-primary/20 bg-primary text-primary-foreground shadow-sm">
					<Icon className="size-5" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-semibold text-sm text-foreground">{title}</span>
					<span className="text-muted-foreground text-xs leading-relaxed">{description}</span>
				</div>
			</Link>
		</NavigationMenuLink>
	);
}




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
