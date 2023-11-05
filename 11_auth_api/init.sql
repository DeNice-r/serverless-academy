--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-05 23:57:41

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

DROP DATABASE IF EXISTS "sls_1";
--
-- TOC entry 3367 (class 1262 OID 16390)
-- Name: sls_1; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "sls_1" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


\connect "sls_1"

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

--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- TOC entry 216 (class 1259 OID 16413)
-- Name: access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."access_tokens" (
    "token" "text" NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 16420)
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."refresh_tokens" (
    "token" "text" NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 16392)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."users" (
    "email" "text" NOT NULL,
    "password_hash" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


--
-- TOC entry 3216 (class 2606 OID 16419)
-- Name: access_tokens access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."access_tokens"
    ADD CONSTRAINT "access_tokens_pkey" PRIMARY KEY ("token");


--
-- TOC entry 3218 (class 2606 OID 16426)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("token");


--
-- TOC entry 3212 (class 2606 OID 16412)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "unique_email" UNIQUE ("email");


--
-- TOC entry 3214 (class 2606 OID 16402)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");


-- Completed on 2023-11-05 23:57:44

--
-- PostgreSQL database dump complete
--

