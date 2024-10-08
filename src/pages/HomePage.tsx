import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function HomePage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
      <p className="text-lg">This is a sample homepage using React and shadcn/ui components.</p>
      <Button onClick={() => toast({ title: "Hello!", description: "This is a toast notification." })}>
        Show Toast
      </Button>
    </div>
  );
}