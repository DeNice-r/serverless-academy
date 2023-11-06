--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-06 18:19:55

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

DROP DATABASE IF EXISTS "sls_4";
--
-- TOC entry 3352 (class 1262 OID 16524)
-- Name: sls_4; Type: DATABASE; Schema: -; Owner: sls_4
--

CREATE DATABASE "sls_4" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "sls_4" OWNER TO "sls_4";

\connect "sls_4"

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
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- TOC entry 215 (class 1259 OID 16525)
-- Name: links; Type: TABLE; Schema: public; Owner: sls_4
--

CREATE TABLE "public"."links" (
    "token" "text" NOT NULL,
    "link" "text" NOT NULL
);


ALTER TABLE "public"."links" OWNER TO "sls_4";

--
-- TOC entry 3203 (class 2606 OID 16531)
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: sls_4
--

ALTER TABLE ONLY "public"."links"
    ADD CONSTRAINT "links_pkey" PRIMARY KEY ("token");


-- Completed on 2023-11-06 18:19:58

--
-- PostgreSQL database dump complete
--

