import { redirect } from "next/navigation";
import { AwafiReviewForm } from "@/components/awafi/AwafiReviewForm";
import { DeferredPixelLoader } from "@/components/tracking/DeferredPixelLoader";
import { getAdReviewModeServer } from "@/lib/ad-review-server";

/**
 * /awafi — رابط الإعلان
 * - وضع المراجعة ON  → صفحة آمنة للمراجعين
 * - وضع المراجعة OFF → عادةً middleware rewrite لـ /pages/awafi؛ هذا fallback فقط
 */
export default async function OfferPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const isGeoRedirect = params.geo === "1";

  if (!isGeoRedirect) {
    const adReviewOn = await getAdReviewModeServer();
    if (!adReviewOn) {
      redirect("/pages/awafi");
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#FBF7F0]" dir="rtl">
        <div className="bg-[#0F3024] text-white text-center text-[12px] font-semibold py-2 px-3">
          الدفع عند الاستلام · شحن لجميع مناطق المملكة
        </div>
        <div className="max-w-3xl mx-auto px-3 py-4 md:py-8">
          <div className="grid md:grid-cols-2 gap-4 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            <div className="relative bg-[#F3EDE2] aspect-square md:aspect-auto min-h-[240px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pain-relief-oil-product.webp"
                alt="زيت العوافي الطبيعي"
                width={498}
                height={501}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain p-5"
              />
            </div>

            <div className="p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-black text-[#0F3024]">
                زيت العوافي الطبيعي
              </h1>
              <p className="text-[13px] text-black/55 mt-1">
                منتج عشبي طبيعي · للاستخدام الموضعي الخارجي
              </p>

              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-black text-[#1E5B3F]">149 ر.س</span>
                <span className="text-[12px] text-black/45">شامل الضريبة</span>
              </div>

              <div className="mt-2 text-[12px] text-black/60 space-y-1">
                <p>• الدفع عند الاستلام</p>
                <p>• شحن لجميع مناطق المملكة</p>
                <p>• مرخّص من الجهات الصحية المختصة</p>
              </div>

              <div className="mt-4">
                <AwafiReviewForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <DeferredPixelLoader />
    </>
  );
}
