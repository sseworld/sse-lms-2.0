'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Editor } from '@/components/editor';
import { Feedback } from '@prisma/client';

interface FeedbackFormProps {
	courseId: string;
	afterSentFeedback: (newFeedback: Feedback) => void;
}

const formSchema = z.object({
	content: z.string(),
});

const FeedbackForm = ({ courseId, afterSentFeedback }: FeedbackFormProps) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const newFeedback = await axios.post(
				`/api/courses/${courseId}/feedbacks`,
				values
			);

			toast.success('Feedback saved successfully');
			afterSentFeedback(newFeedback.data);
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Your feedback:
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Editor {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex items-center gap-x-2">
						<Button disabled={!isValid || isSubmitting} type="submit">
							Send
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default FeedbackForm;
