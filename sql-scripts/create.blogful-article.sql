create table blogful_articles (
    id integer primary key generated by default as identity,
    title text not null,
    content text,
    date_published timestamptz default now() not null
)