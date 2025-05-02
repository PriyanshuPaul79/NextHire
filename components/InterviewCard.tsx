import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import TechIcons from "./TechIcons";






const InterviewCard = ({
  slNo,
  userId,
  role,
  typeOfInterview,
  techstack,
  questions,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  // if user appers from a mixed of behavior and technical then just normalise it to mixed type

  const normalisedTypeOfInterview = /mix/gi.test(typeOfInterview)
    ? "Mixed"
    : typeOfInterview;

  const formatDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-400">
            <p className="badge-text">{typeOfInterview}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="company image"
            height={40}
            width={40}
            className="rounded-full object-fit size-[90px]"
          />
          <h3 className="mt-5 capitalize">{role}</h3>
          <div className="flex flex-row gap-5 mt-2">
            <Image
              src="/calendar.png"
              alt="calender"
              height={20}
              width={20}
            ></Image>
            <p>{formatDate}</p>
            <div className="flex flex-row gap-2 items-center">
              <Image src="star.svg" alt="star" height={22} width={22} />
              <p>{feedback?.totalScore || "--- "}/ 100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You havent taken the interview lets go attend it"}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <TechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={
                feedback ? `/interview/${slNo}/feedback` : `/interview/${slNo}`
              }
            >
              {feedback ? "Check feedback" : "Take the Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
