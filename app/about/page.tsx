"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { mentors, teams, breakpoints } from "./data";


const About: React.FC = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <main className={styles.container}>
            <section>
                <div>
                    <h1 className={styles.heading1}>CodeBuilder App</h1>
                    <p className={styles.paragraph}>
                        CodeBuilder is a platform specifically developed for the Hack Your
                        Future community. It serves as a central hub for students and
                        mentors in Hack Your Future to share code snippets or inspiration
                        with each other. Instead of relying on other options like sending
                        code via Slack, committing and pushing to GitHub, or using existing
                        code sharing platforms like Codepen or Codesandbox, CodeBuilder
                        provides a dedicated space for seamless code sharing and
                        collaboration.
                    </p>
                    <p className={styles.paragraph}>
                        Users can conveniently browse and filter through a gallery of code
                        snippets based on tags, authors, and titles. Each snippet has its
                        own dedicated page where users can view and edit the code directly
                        in their browser. User management is facilitated through Google
                        Firebase GitHub, allowing easy login, snippet creation, editing, and
                        deletion. Additionally, users can mark snippets as favorites and
                        enjoy access to a personalized gallery featuring their own code
                        snippets. CodeBuilder prioritizes code sharing and collaboration
                        while excluding code execution capabilities and sandbox
                        environments.
                    </p>
                </div>

                <div className={styles.mentorslistWrapper}>
                    <h1 className={styles.heading1}>Mentors</h1>

                    <div className={styles.mentorslist}>

                        <Swiper
                            freeMode={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            grabCursor={true}
                            loop={true}
                            modules={[FreeMode, Autoplay, Pagination, Navigation]}
                            breakpoints={breakpoints}
                        >
                            {mentors.map((mentor) => {
                                return (
                                    <SwiperSlide key={mentor.name} className={styles.mentors}>
                                        <Image
                                            src={mentor.imageUrl}
                                            alt="Mentor"
                                            width={200}
                                            height={200}
                                        />
                                        <h2 className={styles.mentorname}>{mentor.name}</h2>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>

                <div className={styles.teamWrapper}>
                    <h1 className={styles.heading1}>Our Creative Teams</h1>
                    <div className={styles.teamList}>
                        <div className={styles.sliderIntro}>
                            <p className={styles.paragraph}>
                                In CodeBuilder, we have a vibrant and supportive community of
                                students and mentors who play a crucial role in our mission to
                                foster learning and growth in the tech industry. Our community
                                is made up of individuals who are passionate about coding, eager
                                to expand their skills, and dedicated to helping each other
                                succeed.
                            </p>
                        </div>

                            <Swiper
                                className={styles.slider}
                                freeMode={true}
                                autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                grabCursor={true}
                                loop={true}
                                modules={[FreeMode, Autoplay, Pagination, Navigation]}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 10,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    968: {
                                        slidesPerView: 3,
                                        spaceBetween: 15,
                                    },
                                }}
                            >
                                <div>
                                    {teams.map((team) => (
                                        <SwiperSlide key={team.username}>
                                            <div className={styles.member}>
                                                <Image
                                                    src={team.userImage}
                                                    alt={team.name}
                                                    width={screenWidth >= 2000 ? 300 : 440}
                                                    height={screenWidth >= 2000 ? 400 : 300}
                                                    className={styles.image}
                                                />
                                                <h3>{team.username}</h3>
                                                <p>{team.name}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </div>
                    </div>
            </section>
        </main>
    );
};

export default About;