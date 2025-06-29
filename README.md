EXAMIFY
    backend
        api-gateway
            src 
                server.ts
                routes
                    proxy.routes.ts
            package.json
            .env
        auth-service
            .env
            package.json
            tsconfig.json
            src
                app.ts
                server.ts
                [all folders] //
        exam-service
            .env
            package.json
            tsconfig.json
            src
                app.ts
                server.ts
                [all folders] //
        user-service
            .env
            package.json
            tsconfig.json
            src
                app.ts
                server.ts
                [all folders] //
        docker.compose.yml
    frontend
        app
            layout.tsx    // rootlayout
            globals.css
            (app)   
                about
                career
                contact
                dashboard
                    instructor
                    student
                    layout.tsx
                layout.tsx  // applayout
                page.tsx    // homepage
            (auth)
                login
                    page.tsx
                register
                    page.tsx
                layout.tsx
            (exam)
                exam
                [examId] 
                        exam-room
                        view-result
                        page.tsx
                layout.tsx
        components
    

