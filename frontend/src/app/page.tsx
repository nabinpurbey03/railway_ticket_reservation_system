import Image from "next/image";
import React from "react";

export default function Home() {
  return(
      <div className="bg-amber-700 h-[80vh] relative">
          <Image
              alt='Nepali Train'
              fill
              src="/asstes/images/train_nepal.jpg"
              className="object-cover w-full"
          />
      </div>
  ) ;
}
