import { usePostImages } from "@/app/hooks/usePostImages";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel";

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
    <div className="items-center justify-center flex">
      {data && data.length > 0 && (
        <Carousel className="w-[90%]">
          <CarouselContent className="h-80">
            {data.map((image) => (
              <CarouselItem key={image.id} className="relative rounded-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.id}`}
                  fill
                  alt={image.name}
                  className="object-contain object-center rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {data?.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      )}
    </div>
  );
}
