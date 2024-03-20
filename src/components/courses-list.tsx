import { CourseWithProgressWithCategory } from '@/actions/get-courses';
import CourseCard from '@/components/course-card';
import { cn } from '@/lib/utils';

interface CoursesListProps {
	items: CourseWithProgressWithCategory[];
	size?: 'sm' | 'lg';
}

const CoursesList = ({ items, size }: CoursesListProps) => {
	return (
		<div>
			<div
				className={cn(
					'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4',
					size === 'sm' &&
						'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'
				)}
			>
				{/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4"> */}
				{items.map((item) => (
					<CourseCard
						key={item.id}
						id={item.id}
						title={item.title}
						imageUrl={item.imageUrl!}
						chaptersLength={item.chapters.length}
						price={item.price!}
						progress={item.progress}
						category={item?.category?.name!}
					/>
				))}
			</div>

			{items.length === 0 && (
				<div className="text-center text-sm text-muted-foreground mt-10">
					No courses found
				</div>
			)}
		</div>
	);
};

export default CoursesList;
