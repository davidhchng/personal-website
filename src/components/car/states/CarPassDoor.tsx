"use client";

import { motion } from "framer-motion";

// Rear (passenger) door swings open — hinge at B-pillar x≈577
export default function CarPassDoor() {
  return (
    <svg viewBox="0 0 1200 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">

      <ellipse cx="562" cy="482" rx="400" ry="18" fill="black" opacity="0.45" />

      {/* BODY */}
      <path d="
        M126 389 L132 368
        C140 339 166 319 201 308 L277 284
        C331 267 414 253 520 251 L675 250
        C749 250 808 260 854 280 L917 308
        C942 319 959 334 969 352 L987 384 L1016 392
        L1016 430 C1016 439 1008 447 999 447
        L932 447 C924 447 917 441 916 433
        C911 390 876 360 831 360 C786 360 748 392 743 433
        C742 441 735 447 727 447 L358 447
        C350 447 343 441 342 433 C337 390 299 360 254 360
        C209 360 171 392 166 433 C165 441 158 447 150 447
        L128 447 C117 447 108 438 108 427
        L108 408 C108 400 115 392 126 389 Z"
        fill="#F7F7F7"
      />
      <path d="M238 420 L741 420 C734 427 729 437 727 447 L358 447 C356 438 350 427 343 420 Z" fill="#E8E8E8" />
      <path d="M248 354 C363 345 522 343 836 347" fill="none" stroke="#D5D5D5" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M250 395 C396 392 596 392 789 395" fill="none" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" />

      <path d="M830 280 L916 307 C935 315 949 325 958 337 L972 356 L948 357 C936 334 918 320 889 308 L826 283 Z" fill="#F3F3F3" />
      <path d="M803 281 C850 283 886 292 917 308 C942 319 959 334 969 352 L987 384 L952 383 L929 346 C917 328 898 314 869 302 C846 292 821 287 792 287 Z" fill="#F4F4F4" />

      {/* FRONT DOOR (static) */}
      <path d="M578 287 L796 287 L827 419 L579 420 Z" fill="#F6F6F6" />

      {/* dark interior cavity behind rear door */}
      <path d="M 340 253 L 577 253 L 577 420 L 339 420 L 336 342 C 340 320 350 305 372 287 L 372 253 Z" fill="#0A0A0A" />
      {/* seat suggestion */}
      <rect x="380" y="305" width="100" height="68" rx="2" fill="#111" />
      <rect x="466" y="305" width="14" height="68" rx="2" fill="#161616" />
      <rect x="396" y="296" width="58" height="13" rx="3" fill="#131313" />

      {/* WINDOWS — front window + windshield stay (rear door window animates) */}
      <path d="M793 286 L862 286 C840 269 818 258 782 252 L738 252 Z" fill="#0E0E11" />
      <path d="M580 286 L790 286 L735 253 L578 253 Z" fill="#0C0D11" />
      <path d="M338 338 C342 320 350 306 368 289 L368 338 Z" fill="#111217" />
      <path d="M578 286 L791 286" stroke="#EBEBEB" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M578 253 L735 253" stroke="#EBEBEB" strokeWidth="2.5" strokeLinecap="round" />

      {/* PILLARS */}
      <rect x="567" y="252" width="10" height="168" rx="2" fill="#D8D8D8" />
      <path d="M737 252 L747 252 L791 286 L782 286 Z" fill="#D0D0D0" />
      <path d="M419 254 L428 253 L368 286 L359 286 Z" fill="#D0D0D0" />

      {/* seam lines */}
      <path d="M797 287 L827 419" stroke="#D0D0D0" strokeWidth="2" />

      {/* front door handle */}
      <rect x="690" y="345" width="26" height="7" rx="3.5" fill="#C0C0C0" />

      {/* mirror */}
      <path d="M824 305 C840 307 848 313 850 324 L831 328 C821 326 816 320 816 314 C816 308 819 305 824 305 Z" fill="#EDEDED" />

      {/* headlights / grille / taillights */}
      <path d="M902 323 C928 324 945 333 952 349 L903 348 C896 347 892 342 892 336 C892 328 896 323 902 323 Z" fill="#F2E5B1" />
      <path d="M947 351 L1000 351 L1009 367 L950 367 Z" fill="#111" />
      <rect x="952" y="370" width="59" height="13" fill="#181818" />
      <circle cx="948" cy="403" r="9" fill="#0E0E0E" />
      <circle cx="948" cy="403" r="4.5" fill="#F0F0F0" opacity="0.6" />
      <path d="M131 370 C141 350 163 337 196 333 L218 331 C210 346 196 360 175 368 C156 376 140 378 131 370 Z" fill="#CC1100" />
      <circle cx="160" cy="349" r="9" fill="#EE2200" opacity="0.7" />
      <path d="M126 368 L132 350 L120 353 L113 370 Z" fill="#1A1A1A" />

      {/* spoiler */}
      <rect x="370" y="243" width="4" height="11" rx="1" fill="#D8D8D8" />
      <rect x="404" y="246" width="4" height="9" rx="1" fill="#D8D8D8" />
      <path d="M364 243 C371 237 385 233 412 235 C421 236 426 240 428 243 L417 245 C413 243 402 241 386 241 L368 242 Z" fill="white" />
      <path d="M364 243 C377 247 394 247 417 245 L416 248 C399 250 376 249 366 246 Z" fill="#E0E0E0" />

      {/* WHEELS */}
      <circle cx="831" cy="413" r="54" fill="#1B1C20" />
      <circle cx="831" cy="413" r="37" fill="#2C2D31" />
      <circle cx="831" cy="413" r="15" fill="#0E0F12" />
      <circle cx="831" cy="413" r="5" fill="#B0B0B0" />
      <g stroke="#60626A" strokeWidth="4" strokeLinecap="round">
        <line x1="831" y1="376" x2="831" y2="392" /><line x1="865" y1="393" x2="851" y2="401" />
        <line x1="865" y1="433" x2="851" y2="425" /><line x1="831" y1="450" x2="831" y2="434" />
        <line x1="797" y1="433" x2="811" y2="425" /><line x1="797" y1="393" x2="811" y2="401" />
      </g>
      <circle cx="254" cy="413" r="54" fill="#1B1C20" />
      <circle cx="254" cy="413" r="37" fill="#2C2D31" />
      <circle cx="254" cy="413" r="15" fill="#0E0F12" />
      <circle cx="254" cy="413" r="5" fill="#B0B0B0" />
      <g stroke="#60626A" strokeWidth="4" strokeLinecap="round">
        <line x1="254" y1="376" x2="254" y2="392" /><line x1="288" y1="393" x2="274" y2="401" />
        <line x1="288" y1="433" x2="274" y2="425" /><line x1="254" y1="450" x2="254" y2="434" />
        <line x1="220" y1="433" x2="234" y2="425" /><line x1="220" y1="393" x2="234" y2="401" />
      </g>

      {/* ── ANIMATED REAR DOOR — hinge at B-pillar x=577 ──────────────────── */}
      <motion.g
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 44 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
        style={{ transformOrigin: "577px 353px" }}
      >
        <path d="M 372 287 L 571 287 L 577 420 L 339 420 L 336 342 C 340 325 349 309 372 287 Z" fill="#F5F5F5" />
        <path d="M 372 286 L 571 286 L 567 253 L 423 253 C 401 259 384 269 372 286 Z" fill="#111217" />
        <line x1="372" y1="286" x2="571" y2="286" stroke="#EBEBEB" strokeWidth="2" />
        <path d="M 374 347 C 430 344 500 343 570 347" fill="none" stroke="#D5D5D5" strokeWidth="2" strokeLinecap="round" />
        <rect x="466" y="345" width="26" height="7" rx="3.5" fill="#C0C0C0" />
      </motion.g>
    </svg>
  );
}
