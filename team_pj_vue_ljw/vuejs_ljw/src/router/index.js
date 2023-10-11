import MyTestGameView from "../views/Presentation/MyTestGameView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/dotestgames",
            name: "mytestgame",
            component: MyTestGameView
        },
    ]
});

export default router;