import { z} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6,)
});

export default function SignUp() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }}   = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = async (data) => {
        try {
            // Simulate an API call
        //await new Promise ((resolve => setTimeout (resolve, 1000)))
        //throw new Error(); 
        console.log(data);
        }
        catch (error) {
            // Handle error, e.g., setError('email', { type: 'manual', message: 'Email already exists' });
            setError('root', {
                message: 'An error occurred while signing up. Please try again later.',
            });
        }
        // Here you would typically handle the form submission, e.g., send data to an API
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 text-black bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 "> 
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
                {errors.root && <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>}
            </form>
        </div>

    );
}