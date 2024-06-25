"use client";

import { useTranslation } from "react-i18next";

export default function LayoutMessage() {
  const { t } = useTranslation();
  return (
    <div
      className="h-full flex flex-col font-bold
      text-6xl  items-start p-6  bg-gradient-to-r from-black to-slate-900
      justify-center lg:flex gap-4"
    >
      <p className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent p-2">
        {t("authMessage1")}
      </p>
      <p className="text-white p-2">{t("authMessage2")}</p>
    </div>
  );
}
