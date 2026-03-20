import React from 'react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"
import AccordionCarousel from './accodrion'
import { Container } from './ui/container'
const Hero = () => {
    return (
        <Container className='py-20'>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 justify-between mb-20">
                <h1 className='text-foreground text-5xl md:text-7xl font-bold tracking-tight max-w-2xl leading-[1.1]'>
                    Journey towards excellence
                </h1>
                <div className="w-full md:w-1/2">
                    <AvatarGroup className="grayscale mb-6">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                            <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt="@evilrabbit"
                            />
                            <AvatarFallback>ER</AvatarFallback>
                        </Avatar>
                        <AvatarGroupCount>+3</AvatarGroupCount>
                    </AvatarGroup>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Structro Infratech is a leading construction and civil engineering firm committed to excellence, innovation, and sustainable building solutions — trusted for quality and reliability.
                    </p>
                </div>
            </div>
            
            <AccordionCarousel />
            <div className="flex flex-col md:flex-row justify-between gap-8 mt-12">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Overview</p>
                <p className="text-xl md:text-2xl text-foreground font-medium w-full md:w-3/4 leading-relaxed">
                    Building the future with precision and passion. We transform complex engineering challenges into iconic landmarks that stand the test of time.
                </p>
            </div>
        </Container>
    )
}

export default Hero