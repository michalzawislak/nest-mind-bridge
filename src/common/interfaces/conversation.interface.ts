interface ConversationThread {
	userQueries: string[];
	AIResponses: string[];
}

interface ConversationThreads {
	[threadId: string]: ConversationThread;
}