import Image from "next/image";
import Link from "next/link";
import {
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
	const { data: session } = useSession();
	const items = useSelector(selectBasketItems);

	return (
		<header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
			<div className="flex items-center justify-center md:w-1/5">
				<Link href="/">
					<div>
						<Image
							className="relative h-10 w-5 cursor-pointer object-contain opacity-75
							transition hover:opacity-100"
							src="https://rb.gy/vsvv2o"
							width={5}
							height={10}
							alt="apple logo"
						/>
					</div>
				</Link>
			</div>
			<div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
				<a className="headerLink">Product</a>
				<a className="headerLink">Explore</a>
				<a className="headerLink">Support</a>
				<a className="headerLink">Business</a>
			</div>
			<div className="flex items-center justify-center gap-x-4 md:w-1/5">
				<MagnifyingGlassIcon className="headerIcon" />
				<Link href="/checkout">
					<div className="relative cursor-pointer">
						{items.length > 0 && (
							<span
								className="absolute -right-1 -top-1 z-50 h-4 w-4 items-center justify-center rounded-full
								bg-gradient-to-r from-pink-50 to-violet-500 text-[10px] text-white"
							>
								{items.length}
							</span>
						)}
						<ShoppingBagIcon className="headerIcon" />
					</div>
				</Link>

				{session ? (
					<Image
						src={
							session.user?.image ||
							"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
						}
						alt="user image"
						className="cursor-pointer rounded-full"
						width={34}
						height={34}
						onClick={() => signOut()}
					/>
				) : (
					<UserIcon
						className="headerIcon"
						onClick={() => signIn()}
					/>
				)}
			</div>
		</header>
	);
};

export default Header;
