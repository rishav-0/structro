import React from 'react'
import AccordionCarousel from './accodrion'
import { Container } from './ui/container'
const Hero = () => {
    return (
        <Container className='py-20'>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 justify-between mb-20">
                <h1 className='text-foreground text-5xl md:text-7xl font-bold tracking-tight max-w-2xl leading-[1.1]'>
                    Journey towards <span className="text-accent underline decoration-primary/30 underline-offset-8">excellence</span>
                </h1>
                <div className="w-full md:w-1/2 flex flex-col items-start">
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-primary tracking-tighter">48+</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Projects Done</span>
                        </div>

                        <div className="w-px h-8 bg-border hidden sm:block"></div>
                        <div className="bg-primary/5 border border-secondary/30 rounded-sm px-3 py-1.5 flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-1 h-full bg-secondary opacity-50"></div>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter leading-none mb-1">ISO 9001:2015</span>
                            <span className="text-[8px] text-muted-foreground font-medium uppercase tracking-tight">Certified Quality</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                        Structro Infratech is a leading construction and civil engineering firm committed to excellence, innovation, and sustainable building solutions — trusted for quality and reliability across Northeast India.
                    </p>
                </div>
            </div>
            
            <AccordionCarousel />
            <div className="flex flex-col md:flex-row justify-between gap-8 mt-12 border-t border-border pt-12">
                <p className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    <span className="w-8 h-px bg-accent"></span>
                    Overview
                </p>
                <p className="text-xl md:text-2xl text-foreground font-medium w-full md:w-3/4 leading-relaxed">
                    Building the future with precision and passion. We transform complex engineering challenges into iconic landmarks that stand the test of time.
                </p>
            </div>
        </Container>
    )
}

export default Hero