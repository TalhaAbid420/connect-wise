import PageHeader from '@/components/PageHeader';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <PageHeader />
      <main className="flex-1">
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10 rounded">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  About Us
                </h2>
              </div>
            </div>
            <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 my-10">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis, illo, quaerat officiis veniam ipsum et omnis quam
              minima quasi repudiandae dolorum repellendus voluptas? Repellat
              temporibus ut, laudantium aut fuga minima quam, corrupti nulla
              illo obcaecati earum repudiandae sapiente officiis magni
              distinctio molestiae dicta adipisci sequi consequatur eum,
              consequuntur exercitationem vel repellendus doloribus. Molestias
              labore exercitationem minus, quisquam tempora corporis similique!
              Eveniet omnis, debitis quo culpa provident consectetur rem
              architecto totam nam officiis repudiandae id ullam tempore
              excepturi illo iste odit amet facilis quia, enim animi. Vitae,
              eius, autem quia ad eveniet deleniti eligendi nihil laboriosam
              molestiae odio fugiat labore aliquid.
            </p>
            <p>
              Email: <Link to="mailto:test@test.com">test@test.com</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
