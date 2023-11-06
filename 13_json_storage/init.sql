--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0

-- Started on 2023-11-06 16:05:26

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

DROP DATABASE IF EXISTS "sls_3";
--
-- TOC entry 3352 (class 1262 OID 16514)
-- Name: sls_3; Type: DATABASE; Schema: -; Owner: sls_3
--

CREATE DATABASE "sls_3" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "sls_3" OWNER TO "sls_3";

\connect "sls_3"

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
-- TOC entry 215 (class 1259 OID 16515)
-- Name: jsons; Type: TABLE; Schema: public; Owner: sls_3
--

CREATE TABLE "public"."jsons" (
    "path" "text" NOT NULL,
    "json" "json" NOT NULL
);


ALTER TABLE "public"."jsons" OWNER TO "sls_3";

--
-- TOC entry 3203 (class 2606 OID 16521)
-- Name: jsons jsons_pkey; Type: CONSTRAINT; Schema: public; Owner: sls_3
--

ALTER TABLE ONLY "public"."jsons"
    ADD CONSTRAINT "jsons_pkey" PRIMARY KEY ("path");


-- Completed on 2023-11-06 16:05:32

--
-- PostgreSQL database dump complete
--

