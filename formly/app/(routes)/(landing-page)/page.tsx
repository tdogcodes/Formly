"use client";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import HampsterLoader from "@/app/(routes)/(landing-page)/components/hampster";
import CubeLogo from "@/app/(routes)/(landing-page)/components/cubeLogo";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TapeSection from "./components/tape";
import { StarIcon } from "lucide-react";

export default function LandingPage() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });

  return (
    <main
      className="flex overflow-x-hidden  h-full w-full flex-col justify-center items-center bg-secondary/50"
      style={{
        width: "full",
        height: "full",
        backgroundColor: "#ffffff",
        backgroundImage: `radial-gradient(#aa78ff 1px, #28282d 0)`,
        backgroundSize: "30px 30px",
        backgroundPosition: "-5px -5px",
      }}
    >
      <motion.div>
        <StarIcon
          color="#e07aff"
          className="size-10 absolute z-70 animate-pulse rotate-12 transition-all duration-2000 hidden md:block md:top-[400px] md:left-[60px] xl:left-1/4"
        />
        <StarIcon
          color="#aa78ff"
          className="size-10 absolute z-70 animate-pulse rotate-12 transition-all duration-2000 hidden md:block md:top-[300px] md:right-[60px] xl:right-1/4"
        />
        <StarIcon
          color="#aa78ff"
          className="size-10 absolute z-70 animate-pulse rotate-12 transition-all duration-2000 hidden md:block md:bottom-[300px] -mr-16 md:right-[160px] xl:right-[240px]"
        />
        <StarIcon
          color="#e07aff"
          className="size-10 absolute z-70 animate-pulse rotate-12 transition-all duration-2000 hidden md:block md:bottom-[200px] md:left-[160px] xl:right-[240px]"
        />
        <StarIcon
          color="#aa78ff"
          className="size-10 absolute z-70 animate-pulse rotate-12 transition-all duration-2000 hidden md:block md:top-[160px] md:left-[180px] xl:right-[240px]"
        />
        <StarIcon
          color="#e07aff"
          className="size-10 absolute z-70 animate-pulse rotate-12 transition-all duration-2000 hidden md:block md:top-[100px] md:right-[180px] xl:right-[240px]"
        />
      </motion.div>
      <div className="flex mt-[180px] justify-center items-center flex-col">
        <HampsterLoader />
        <CubeLogo
          outermost="mt-1 h-[120px] flex text-white items-center justify-center max-md:text-6xl md:h-[140px] w-[440px] md:w-[490px]"
          text="Formly"
        />
        <motion.div
          className="flex flex-col justify-center items-center"
          transition={{ duration: 1, delay: 0.2 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-3xl text-center my-8 font-semibold text-gray-200">
            The easiest drag and drop <br /> form building platform.
          </p>
          <section className="flex gap-4">
            <LoginLink>
              <Button className="p-8 text-lg">Sign in</Button>
            </LoginLink>
            <RegisterLink>
              <Button className="p-8 text-lg"  variant="secondary">
                Sign up
              </Button>
            </RegisterLink>
          </section>
        </motion.div>
      </div>
      <section className="mt-64 flex justify-center items-center flex-col">
        <motion.h2
          className="text-4xl mb-8 md:text-5xl font-semibold text-white"
          ref={ref1}
          initial={{ opacity: 0, x: "-50%" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          animate={inView1 && { opacity: 1, x: 0 }}
        >
          Build sharable forms in minutes
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-2.5  items-center justify-center">
          <Card className="w-[400px] mr-20 md:mr-0 lg:w-[600px] hover:rotate-3 transition-all duration-300 h-[400px] lg:h-[600px] p-8 bg-[hsl(30,90%,90%)] shadow-md rounded-lg">
            <p className="md:text-xl lg:text-2xl text-center text-gray-900">
              Build forms in minutes, not hours.
            </p>
            <p className="text-lg text-center text-gray-900">
              No coding required.
            </p>
            <div className="border rounded-md mt-2 h-[85%]">
            <p className="text-center">
              *Image/video of form building process*
            </p>
            </div>
          </Card>
          <Card className="w-[400px] lg:w-[600px] ml-20 md:ml-0 mt-8 md:mt-24 z-30 hover:rotate-3 transition-all duration-300 h-[400px] lg:h-[600px] p-8 bg-[hsl(30,90%,90%)] shadow-md rounded-lg">
            <p className="md:text-xl lg:text-2xl text-center text-gray-900">
              Build forms in minutes, not hours.
            </p>
            <p className="text-lg text-center text-gray-900">
              No coding required.
            </p>
            <div className="border rounded-md mt-2 h-[85%]">
            <p className="text-center">
              *Bullet point explaining features*
            </p>
            </div>
          </Card>
        </div>
      </section>
      <section className="mt-52 mb-16 flex justify-center items-center flex-col">
        <motion.h2
          className="text-4xl mb-8 md:text-5xl font-semibold text-white"
          ref={ref2}
          initial={{ opacity: 0, x: "50%" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          animate={inView2 && { opacity: 1, x: 0 }}
        >
          Track and analyze your responses
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-2.5 items-center justify-center">
          <Card className="w-[400px] lg:w-[600px] mr-20 md:mr-0 right-[50%] hover:rotate-3 transition-all duration-300 h-[400px] lg:h-[600px] p-8 bg-[hsl(30,90%,90%)] shadow-md rounded-lg">
            <p className="md:text-xl lg:text-2xl text-center text-gray-900">
              Build forms in minutes, not hours.
            </p>
            <p className="text-lg text-center text-gray-900">
              No coding required.
            </p>
            <div className="border rounded-md mt-2 h-[85%]">
              <p className="text-center">*Image/video of form data analytics*</p>
            </div>
          </Card>
          <Card className="w-[400px] lg:w-[600px] ml-20 md:ml-0 left-[40%] hover:rotate-3 transition-all duration-300 mt-8 md:mt-24 z-30 h-[400px] lg:h-[600px] p-8 bg-[hsl(30,90%,90%)] shadow-md rounded-lg">
            <p className="md:text-xl lg:text-2xl text-center text-gray-900">
              Build forms in minutes, not hours.
            </p>
            <p className="text-lg text-center text-gray-900">
              No coding required.
            </p>
            <div className="border rounded-md mt-2 h-[85%]">
              <p className="text-center">
                *Bullet points explaining the features*
              </p>
            </div>
          </Card>
        </div>
      </section>
      <div className="flex justify-center items-center">
        <TapeSection />
      </div>
      <div className="flex flex-col justify-center my-24">
        <h2 className="text-3xl md:text-5xl font-semibold text-white">
          Sign up and get a one month free trial
        </h2>
        <section className="flex justify-center py-12 gap-4">
          <LoginLink>
            <Button className="p-8 text-lg">Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button className="p-8 text-lg" variant="secondary">
              Sign up
            </Button>
          </RegisterLink>
        </section>
      </div>
      <footer className="max-sm:text-sm md:text-md flex flex-row justify-center items-center gap-24 text-white">
        <span className="pb-6">Sandoval Software - 2025</span>
        <span className="pb-6">Tracy Sandoval</span>
        <span className="pb-6">trxcycsgo@gmail.com</span>
      </footer>
    </main>
  );
}
