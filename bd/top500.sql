--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.4

-- Started on 2020-02-17 23:56:51

--
-- TOC entry 197 (class 1259 OID 31101)
-- Name: rankings; Type: TABLE; Schema: public; Owner: postgres
--

-- Table: public.rankings

-- DROP TABLE public.rankings;

CREATE TABLE public.rankings
(
    ranking integer NOT NULL,
    site character varying(400) COLLATE pg_catalog."default" NOT NULL,
    manufacturer character varying(200) COLLATE pg_catalog."default" NOT NULL,
    country character varying(100) COLLATE pg_catalog."default" NOT NULL,
    year integer NOT NULL,
    rmax numeric NOT NULL,
    processor character varying(400) COLLATE pg_catalog."default" NOT NULL,
    mhz numeric NOT NULL,
    os character varying(400) COLLATE pg_catalog."default" NOT NULL,
    architecture character varying(400) COLLATE pg_catalog."default" NOT NULL,
    continent character varying(400) COLLATE pg_catalog."default" NOT NULL,
    rank_month integer NOT NULL,
    rank_year integer NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public.rankings
    OWNER to postgres;


CREATE TABLE public.continents
(
    code character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT continents_pkey PRIMARY KEY (code)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.continents
    OWNER to postgres;    


--
-- TOC entry 2179 (class 0 OID 0)
-- Dependencies: 197
-- Name: TABLE rankings; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.rankings IS 'Rankings Top 500';



-- Completed on 2020-02-17 23:56:52

--
-- PostgreSQL database dump complete
--

