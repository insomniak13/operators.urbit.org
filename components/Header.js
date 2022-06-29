import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import classnames from "classnames";
import path from "path";
import Section from "../components/Section";
import { capitalize } from "../lib/lib";

export default function Header(props) {
  return (
    <header className="layout px-4 md:px-8 flex justify-between items-center pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12 lg:pb-24">
      <Link href="/">
        <a className="font-semibold text-lg flex items-center">
          Urbit Operators
        </a>
      </Link>

      <nav className="flex">
        {/* <Link href="/faq">
          <a className="type-ui mr-4">FAQ</a>
        </Link> */}
      </nav>
    </header>
  );
}
