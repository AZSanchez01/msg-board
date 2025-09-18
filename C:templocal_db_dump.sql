--
-- PostgreSQL database dump
--

\restrict SwB8ucUBQLzAOJpvF5bs0okTqSowgz2xwpDEFdp97ZZoFn35wgP5B2eg9IgDL9M

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: aivan
--

CREATE TABLE public.messages (
    id text NOT NULL,
    message_title text,
    message text,
    author text,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.messages OWNER TO aivan;

--
-- Name: session; Type: TABLE; Schema: public; Owner: aivan
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO aivan;

--
-- Name: users; Type: TABLE; Schema: public; Owner: aivan
--

CREATE TABLE public.users (
    username text NOT NULL,
    first_name text,
    last_name text,
    password text,
    member boolean,
    admin boolean
);


ALTER TABLE public.users OWNER TO aivan;

--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: aivan
--

COPY public.messages (id, message_title, message, author, "timestamp") FROM stdin;
1a055d3e-1619-489a-ac8c-3148f4cf542a	Pag-ibig ay Kanibalismo II	Ibabalik kita nang buong-buo. Pangako 'yun sa'yo. Sa'yo lang ang puso ko Kahit kainin mo. At hahalik ka nang may lipstick na dugo. Sa labi kong punong-puno ng panlasa ko sa’yo. Kanibalismo, ’di ka matiis. Kapag inalis mo, ika'y mamimiss. ’Di nagmamalinis. O ika'y mamimiss. 'Di ka matitiis. Tatlo na sais. Pag-ibig mong kay tamis.	Aivan Sanchez	2025-09-18 01:50:40
2cd011c8-10a2-4fcb-adc1-23a3cb94d783	Dilim 	Malayo pa nga ako. Sa pupuntahang yugto. 'Di ko alam saan. Ano ba ang dahilan? Masasandalan mo nga\r\nAng aking balikat na. Handang magpaka-martyr. There's nothing for you to fear. Kung sakali nga na gumuho ang mundo. Sana malaman mo, ikaw nasa puso ko\r\nLangit o lupa? Purgatoryo o impyerno? Kahit saan pa 'yan, ikaw pa rin ang laman. (Ng pusong madilim).	Aivan Sanchez	2025-09-18 01:58:01
22a1c9f5-172b-43fa-b284-308d75d25af0	Lipstick na Itim	Tinatago mo sa likod ng lipstick na itim, oh, ngiti mong kay dilim. Kinukubli ang gandang bumihag sa 'kin. Sa lipstick na itim, mga mata nagniningning. Na kahit itago mo'y kumikislap pa rin. Sa lipstick na itim~	MishConan Cha	2025-09-18 02:09:29
bfb0b8c2-d0e7-47a0-a24c-3ed98ea9b03d	Bawat Piyesa	Bawat ngiti, bawat luha. Bawat gising, bawat pikit. Bawat hangin na tinatanggap. Bawat buga. At habang ika′y yinayakap nang maigi. Binubulong ang dalanging 'wag sana maglaho sa hangin. Ang bawat piyesa na bumubuo sa ′yo. Bawat piyesang nawa'y mapasaakin habang-buhay.	MishConan Cha	2025-09-18 02:12:29
5ee70f24-543f-4078-ae42-9379061c67d2	Beer	Giliw, 'wag mo sanang limutin. Ang mga araw na hindi sana naglaho. Mga anak at bahay nating pinaplano. Lahat ng ito'y nawala no'ng iniwan mo 'ko. Kaya ngayon. Ibuhos na ang beer sa aking lalamunan. Upang malunod na ang puso kong nahihirapan. Bawat patak, anong sarap. Ano ba talaga'ng mas gusto ko? Ang beer na 'to o ang pag-ibig mo?	Mizna Kitan	2025-09-18 02:17:24
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: aivan
--

COPY public.session (sid, sess, expire) FROM stdin;
Oznl0XTnBCyLLF8oPIpNreemSnYFE4Aa	{"cookie":{"originalMaxAge":86400000,"expires":"2025-09-19T03:30:08.309Z","httpOnly":true,"path":"/"}}	2025-09-19 11:30:22
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: aivan
--

COPY public.users (username, first_name, last_name, password, member, admin) FROM stdin;
azusanchez@gmail.com	Aivan	Sanchez	$2b$10$7cY0MW56lB2h1yzWnmpZ9.qJhw1OJ9joqL17GmNAhqGT0vGSpmaTi	t	t
mccha@yahoo.com	MishConan	Cha	$2b$10$GIcgwfkzH5oz2OmJaeAs1OzIGJjpmzy8eJb6cAPlIGqZDoWjHpvjW	\N	\N
missnakita@ust.com	Mizna	Kitan	$2b$10$or1UXNiapVThS3e5P7/74e6kmXqHlILUQr4h/ht.kHQDybRUxWkra	t	t
\.


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: aivan
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: aivan
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: aivan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: aivan
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

\unrestrict SwB8ucUBQLzAOJpvF5bs0okTqSowgz2xwpDEFdp97ZZoFn35wgP5B2eg9IgDL9M

