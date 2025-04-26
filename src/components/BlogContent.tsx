"use client";

import moment from "moment";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import {
  LuCalendar as CalendarIcon,
  LuClock3 as ClockIcon,
  LuTag as TagIcon
} from "react-icons/lu";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IBlog } from "@/interfaces/i-home";

export default function BlogContent({ data }: { data: IBlog }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="font-semibold text-left text-3xl md:text-4xl lg:text-5xl text-app-secondary">
        {data.title}
      </h2>
      <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mt-3 mb-6">
        <div className="flex items-center">
          <CalendarIcon className="mr-1 h-4 w-4" />
          <span>{moment(data.createdAt).format("YYYY-MM-DD")}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="mr-1 h-4 w-4" />
          <span>{data.readTime} min read</span>
        </div>
      </div>
      {!!data.image && (
        <div className="w-full mb-6 rounded-md shadow-md shadow-black">
          {data.blurDataUrl ? (
            <Image
              src={data.image}
              alt={data.title}
              width={1000}
              height={1000}
              className="w-full rounded-md"
              placeholder="blur"
              blurDataURL={data.blurDataUrl}
            />
          ) : (
            <Image
              src={data.image}
              alt={data.title}
              width={1000}
              height={1000}
              className="w-full rounded-md"
            />
          )}
        </div>
      )}
      <div className="text-left text-gray-600 w-full mt-8">
        <ReactMarkdown className="prose prose-invert">
          {data.content}
        </ReactMarkdown>
      </div>
      <Separator className="my-6" />
      <section className="my-3 flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-app-primary/70 text-gray-200 hover:bg-gray-600"
          >
            <TagIcon className="mr-1 h-4 w-4" />
            {tag}
          </Badge>
        ))}
      </section>
    </motion.article>
  );
}
