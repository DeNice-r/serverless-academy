--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-06 12:50:39

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
-- TOC entry 3362 (class 1262 OID 16476)
-- Name: sls_1; Type: DATABASE; Schema: -; Owner: sls_1
--

CREATE DATABASE "sls_1" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "sls_1" OWNER TO "sls_1";

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
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- TOC entry 216 (class 1259 OID 16501)
-- Name: tokens; Type: TABLE; Schema: public; Owner: sls_1
--

CREATE TABLE "public"."tokens" (
    "token" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "expires_at" timestamp with time zone
);


ALTER TABLE "public"."tokens" OWNER TO "sls_1";

--
-- TOC entry 215 (class 1259 OID 16487)
-- Name: users; Type: TABLE; Schema: public; Owner: sls_1
--

CREATE TABLE "public"."users" (
    "email" "text" NOT NULL,
    "password_hash" "text" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "sls_1";

--
-- TOC entry 3212 (class 2606 OID 16507)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: sls_1
--

ALTER TABLE ONLY "public"."tokens"
    ADD CONSTRAINT "tokens_pkey" PRIMARY KEY ("token");


--
-- TOC entry 3208 (class 2606 OID 16498)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: sls_1
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "unique_email" UNIQUE ("email");


--
-- TOC entry 3210 (class 2606 OID 16500)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: sls_1
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");


--
-- TOC entry 3213 (class 2606 OID 16508)
-- Name: tokens user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sls_1
--

ALTER TABLE ONLY "public"."tokens"
    ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Completed on 2023-11-06 12:50:42

--
-- PostgreSQL database dump complete
--

