import { usePostImages } from "@/app/hooks/usePostImages";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  id: string;
};

export default function Images({ id }: Props) {
  const { data, isLoading, error } = usePostImages(id);

  if (error) return <>{error.message}</>;

  if (isLoading) {
    return (
      <center className="mt-10">
        <Loader2 size={30} strokeWidth={3} className="animate-spin  " />
      </center>
    );
  }
  return (
    <div>
      {data && data.length > 0 && (
        <div className="relative h-80 w-full">
          <div className="grid grid-flow-col  gap-2 h-full">
            {data.map((image) => (
              <div key={image.id} className="relative h-full ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.id}`}
                  fill
                  alt={image.name}
                  className="object-cover object-center rounded-sm "
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
