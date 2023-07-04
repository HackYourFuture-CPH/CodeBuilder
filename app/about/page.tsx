"use client";
import React from "react";
import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

const mentors = [
    {
        name: "René Jøhnke",
        imageUrl:
            "https://ca.slack-edge.com/T428UGBJA-U03ELE49R27-78cbd98dfc11-512",
    },
    {
        name: "Thomas Ebert",
        imageUrl:
            "https://ca.slack-edge.com/T428UGBJA-U02DS01SVFZ-006d647d01ea-512",
    },
    {
        name: "Ricardo Aguiar",
        imageUrl: "https://ca.slack-edge.com/T428UGBJA-UL2CW9V6C-1b445c82fed6-512",
    },
    {
        name: "Maher Hussain",
        imageUrl:
            "https://ca.slack-edge.com/T428UGBJA-U010KL619HU-88a2b31b1e74-512",
    },
    {
        name: "Mahmoud Younes",
        imageUrl:
            "https://ca.slack-edge.com/T428UGBJA-U03HGV0LF44-5405fa50d695-512",
    },
    {
        name: "Lucas Iversen",
        imageUrl:
            "https://ca.slack-edge.com/T428UGBJA-U04QRJTTPQR-9c70f3b9cd02-192",
    },
    {
        name: "Karolina Urniežiūtė",
        imageUrl:
            "https://ca.slack-edge.com/T428UGBJA-U0156G8LD3N-17a55922006a-512",
    }
];

const teams = [
    {
        name: "Team 1",
        username: "Tigran Nersesyan",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U043NKHNPTK-dfd8d0bbe630-512",
    },
    {
        name: "Team 1",
        username: "Malek Karzoun",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U0433C9BCCW-be5b2fa04370-512",
    },
    {
        name: "Team 1",
        username: "Jemima Masamu",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U0433C97MV4-983e7929f193-192",
    },
    {
        name: "Team 1",
        username: "Anastasiia Yaitska",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U043CE3AT4L-7676c0cb42ae-512",
    },
    {
        name: "Team 2",
        username: "Mykyta Slastushevskyi",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U043A1313QS-8f65b787d0f8-192",
    },
    {
        name: "Team 2",
        username: "Dima Kutaini",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U0433C99LBY-a0223e4e8f04-512",
    },
    {
        name: "Team 2",
        username: "Anna Dzhyhota",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U0433C8MQS2-6e635605d604-512",
    },
    {
        name: "Team 3",
        username: "Mercedes Ubeira Romero",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U046MFXGX7B-b272be990a91-512",
    },
    {
        name: "Team 3",
        username: "Dmytrii Datskevych",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U043ZMN5D40-c7f9ec8031db-512",
    },
    {
        name: "Team 3",
        username: "Raman Nasirizadeh",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U0439TKP1LK-a0ccf43a7a82-512",
    },
    {
        name: "Team 4",
        username: "Anton Bondarev",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U043722NUN9-fb91f3a53adb-512",
    },
    {
        name: "Team 4",
        username: "Shweta Malav Gupta",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U042VDSSPPZ-636e6ab5a10f-512",
    },
    {
        name: "Team 4",
        username: "Yuliia Davydenko",
        userImage:
            "https://ca.slack-edge.com/T428UGBJA-U04519B48EN-b9992623a4b0-512",
    },
];

const About: React.FC = () => {
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
                        {mentors.map((mentor) => {
                            return (
                                <div key={mentor.name} className={styles.mentors}>
                                    <Image
                                        src={mentor.imageUrl}
                                        alt="Mentor"
                                        width={200}
                                        height={200}
                                    />
                                    <h2 className={styles.mentorname}>{mentor.name}</h2>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.team}>
                    <h1 className={styles.heading1}>Our Creative Teams</h1>
                    <div className={styles.containerTwo}>
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
                                                width={300}
                                                height={400}
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