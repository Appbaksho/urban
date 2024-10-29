import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navbar from "@/components/common/navbar";
import Image from "next/image";
import Footer from "@/components/common/footer";
import HeroSection from "@/components/home/hero-section";

export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Footer/>
    </>
  );
}
