import React from 'react';
import classes from "../css/Header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className={classes.header}>
          <Link className={classes.headerLink} to="/">Blog</Link>
          <Link className={classes.headerLink} to="/content">お問い合わせ</Link>
        </header>
    )
}